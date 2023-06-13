import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const paymentRouter = createTRPCRouter({
  pay: protectedProcedure
    .input(z.object({ capsuleId: z.string(), price: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.payment.create({
        data: {
          userId: ctx.session.user.id,
          capsuleId: input.capsuleId,
          price: input?.price,
        },
      });
    }),
});
