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
      orderBy: { createdAt: "desc" },
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
  deleteCapsule: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.capsule.delete({
        where: { id: input.id },
      });
    }),
});
