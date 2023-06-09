import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const likesRouter = createTRPCRouter({
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
  checkIfLiked: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.like.findFirst({
        where: { capsuleId: input.id, userId: ctx.session.user.id },
      });
    }),
});
