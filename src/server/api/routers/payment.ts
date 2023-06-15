import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

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
  isPaidEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // const account = await client
      //   .get({
      //     TableName: env.TABLE_NAME,
      //     Key: {
      //       pk: `email|${input.email}`,
      //       sk: `email|${input.email}`,
      //     },
      //   })
      //   .promise();

      return {
        isValid: "staitment" ? true : false,
      };
    }),
  createCheckout: publicProcedure.mutation(() => {
    return stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "us_bank_account"],
      line_items: [
        {
          price: env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXTAUTH_URL}/`,
    });
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
