import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  getTotalCapsules: protectedProcedure.query(({ ctx, input }) => {
    return ctx.prisma.capsule.count();
  }),
  getTotalOpenCapsules: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.count({
      where: {
        opened: true,
      },
    });
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.findMany({
      include: { user: true },
    });
  }),
  getTotalUsers: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.count();
  }),
  getMostReacentCapsule: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.capsule.findFirst({
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });
  }),
  getTotalComments: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.comment.count();
  }),
});
