import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ capsuleId: z.string(), body: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.comment.create({
        data: {
          userId: ctx.session.user.id,
          capsuleId: input.capsuleId,
          body: input.body,
        },
      });
    }),
  getByCapsuleId: publicProcedure
    .input(z.object({ capsuleId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.comment.findMany({
        where: { capsuleId: input.capsuleId },
        include: { user: true },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.comment.delete({ where: { id: input.id } });
    }),
  totalComments: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.comment.count({ where: { capsuleId: input.id } });
    }),
});

//   like: protectedProcedure

//     .input(z.object({ id: z.string() }))
//     .mutation(async ({ ctx, input }) => {
//       const hasVoted = await ctx.prisma.like.findFirst({
//         where: { capsuleId: input.id, userId: ctx.session.user.id },
//       });
//       if (hasVoted) {
//         return ctx.prisma.like.delete({ where: { id: hasVoted.id } });
//       }
//       return ctx.prisma.like.create({
//         data: { capsuleId: input.id, userId: ctx.session.user.id },
//       });
//     }),

//   checkIfLiked: protectedProcedure
//     .input(z.object({ id: z.string() }))
//     .query(({ ctx, input }) => {
//       return ctx.prisma.like.findFirst({
//         where: { capsuleId: input.id, userId: ctx.session.user.id },
//       });
//     }),
// });
