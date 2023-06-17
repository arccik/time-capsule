import { createTRPCRouter, publicProcedure } from "../trpc";

import { z } from "zod";
import Stripe from "stripe";
import { env } from "~/env.mjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const paymentRouter = createTRPCRouter({
  createCheckout: publicProcedure
    .input(z.object({ capsuleId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const stripeSession = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price: env.STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        success_url: `http://www.messagettf.com/dashboard/?success=true?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://www.messagettf.com/dashboard/?canceled=true`,
      });
      await ctx.prisma.capsule.update({
        where: { id: input.capsuleId },
        data: {
          paymentId: stripeSession.id,
        },
      });
      return stripeSession;
    }),
  getStripeSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);
      return {
        email: session.customer_details?.email,
      };
    }),
});
