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
  getAllSendingMethods: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.sendingMethod.findMany({
      include: { Capsule: false },
    });
  }),
  getSendingMethod: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.sendingMethod.findFirst({ where: { id: input.id } });
    }),
  create: protectedProcedure
    .input(createCapsuleSchema)
    .mutation(({ ctx, input }) => {
      const listOfMethodIds = input.sendingMethod?.map((method) => method.id);

      const capsule = {
        dateTime: input.dateTime,
        post: input.post,
        phone: input.phone,
        email: input.email,
        sendingMethod: {
          connect: listOfMethodIds?.map((id) => ({ id })),
        },
        message: input.message,
        senderName: input.senderName,
        recipientName: input.recipientName,
        public: input.public,
        userId: ctx.session.user.id,
        sms: input.sms,
      };
      return ctx.prisma.capsule.create({
        data: capsule,
        include: { sendingMethod: true },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.capsule.delete({ where: { id: input.id } });
    }),
  getOpenCapsules: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.findMany({
      where: {
        public: true,
      },
    });
  }),
});
