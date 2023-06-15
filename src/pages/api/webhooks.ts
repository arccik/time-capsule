import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";

import { buffer } from "micro";
import { env } from "~/env.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const signature = req.headers["stripe-signature"];

    try {
      if (signature && webhookSecret) {
        const event = stripe.webhooks.constructEvent(
          buf.toString(),
          signature,
          webhookSecret
        );
        switch (event.type) {
          case "payment_intent.succeeded": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(`PaymentIntent status: ${paymentIntent.status}`);
            break;
          }
          case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(
              "❌ Payment failed:",
              paymentIntent.last_payment_error?.message
            );
            break;
          }
          case "charge.succeeded": {
            const charge = event.data.object as Stripe.Charge;
            console.log(`Charge id: ${charge.id}`);
            break;
          }
          default: {
            console.warn(`Unhandled event type: ${event.type}`);
            break;
          }
        }
        // Return a response to acknowledge receipt of the event.
        res.json({ received: true });
      }
    } catch (err) {
      // On error, log and return the error message.
      if (err instanceof Error) {
        console.log(`❌ Error message: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
      return;
    }

    // Successfully constructed event.
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhookHandler;
