import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { createCapsuleSchema } from "~/types/capsule";

export const capsuleRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.capsule.findFirst({
        where: { id: input.id },
        include: { user: { select: { name: true, email: true, image: true } } },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  getAllBuried: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.findMany({
      where: { userId: ctx.session.user.id, paid: true },
    });
  }),

  create: protectedProcedure
    .input(createCapsuleSchema)
    .mutation(({ ctx, input }) => {
      const capsule = {
        dateTime: input.dateTime,
        phone: input.phone,
        email: input.email,
        sendingMethod: input.sendingMethod,
        message: input.message,
        public: input.public,
        userId: ctx.session.user.id,
        subject: input.subject,
        image: input.image,
        voiceMessage: input.voiceMessage,
      };
      return ctx.prisma.capsule.create({
        data: capsule,
      });
    }),
  like: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const hasVoted = await ctx.prisma.like.findFirst({
        where: { capsuleId: input.id, userId: ctx.session.user.id },
      });
      if (hasVoted) {
        return ctx.prisma.like.delete({ where: { id: hasVoted.id } });
      }
      return ctx.prisma.like.create({
        data: { capsuleId: input.id, userId: ctx.session.user.id },
      });
    }),
  totalLikes: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.like.count({ where: { capsuleId: input.id } });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.capsule.delete({ where: { id: input.id } });
    }),
  openNext: publicProcedure.query(({ ctx }) => {
    const today = new Date();
    return ctx.prisma.capsule.findFirst({
      where: {
        dateTime: {
          gte: today,
        },
      },
      orderBy: {
        dateTime: "asc",
      },
      select: {
        dateTime: true,
      },
    });
  }),
  // replacement to implement infinity load
  // getOpenMessages: publicProcedure
  //   .input(
  //     z.object({
  //       limit: z.number().min(1).max(100).nullish(),
  //       cursor: z.number().nullish(),
  //     })
  //   )
  //   .query(({ ctx, input }) => {
  //     const limit = input.limit ?? 50;
  //     const { cursor } = input;

  //     return ctx.prisma.capsule.findMany({
  //       take: limit + 1, // get an extra item at the end which we'll use as next cursor
  //       where: {
  //         public: true,
  //         opened: true,
  //       },
  //       cursor: cursor ? { myCursor: cursor } : undefined,
  //       orderBy: {
  //         myCursor: "asc",
  //       },
  //     });
  //   }),
  getInfinityMessages: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor } = input;
      const items = await ctx.prisma.capsule.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          public: true,
          opened: true,
        },
        include: {
          likes: true,
          comments: true,
          user: { select: { name: true, email: true, image: true } },
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }
      return { items, nextCursor };
    }),

  getOpenCapsules: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(({ ctx, input }) => {
      const where = {
        public: true,
        opened: true,
      };
      return ctx.prisma.$transaction([
        ctx.prisma.capsule.findMany({
          skip: 12 * (input.page - 1),
          take: 12,
          where,
          orderBy: { dateTime: "desc" },
          include: {
            user: true,
            likes: true,
            comments: true,
          },
        }),
        ctx.prisma.capsule.count({ where }),
      ]);
    }),
  getOpenCapsulesByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.findMany({
      where: {
        userId: ctx.session.user.id,
        opened: true,
      },
    });
  }),
  getUnpaidCapsules: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.findMany({
      where: {
        userId: ctx.session.user.id,
        paid: false,
      },
    });
  }),

  getTotalCapsules: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.count({
      where: { userId: ctx.session.user.id },
    });
  }),
  getTotalOpenCapsules: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.count({
      where: { userId: ctx.session.user.id, opened: true },
    });
  }),

  getTotalPublicCapsules: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.count({
      where: { public: true, userId: ctx.session.user.id },
    });
  }),
  getTotalUnpaidCapsules: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.count({
      where: {
        userId: ctx.session.user.id,
        paid: false,
      },
    });
  }),
  openToPublic: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const capsule = await ctx.prisma.capsule.findFirst({
        where: { id: input.id, public: true },
        select: { public: true },
      });
      return ctx.prisma.capsule.update({
        where: { id: input.id },
        data: { public: capsule ? false : true },
      });
    }),
});
