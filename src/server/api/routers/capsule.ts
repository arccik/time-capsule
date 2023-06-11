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
      return ctx.prisma.capsule.findFirst({ where: { id: input.id } });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),

  create: protectedProcedure
    .input(createCapsuleSchema)
    .mutation(({ ctx, input }) => {
      const capsule = {
        dateTime: input.dateTime,
        post: input.post,
        phone: input.phone,
        email: input.email,
        sendingMethod: input.sendingMethod,
        message: input.message,
        senderName: input.senderName,
        recipientName: input.recipientName,
        public: input.public,
        userId: ctx.session.user.id,
        sms: input.sms,
        subject: input.subject,
        openIn: input.openIn,
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
  getOpenCapsules: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.findMany({
      orderBy: { dateTime: "desc" },
      where: {
        public: true,
      },
      include: {
        user: true,
      },
    });
  }),
  checkExpired: publicProcedure.query(({ ctx }) => {
    console.log("Check Expired Run: ", ctx);
    const today = new Date();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    return ctx.prisma.capsule.findMany({
      // orderBy: { dateTime: "desc" },
      where: {
        dateTime: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
  }),
});
