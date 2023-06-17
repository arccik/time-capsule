import type { NextApiResponse, NextApiRequest } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }
    switch (event.type) {
      // case "payment_intent.succeeded":
      //   const paymentIntentSucceeded = event.data.object as {
      //     id: string;
      //     receipt_email: string;
      //   };
      //   break;

      case "checkout.session.completed":
        const checkoutSessionSucceeded = event.data.object as { id: string };
        await prisma.capsule.update({
          where: {
            paymentId: checkoutSessionSucceeded.id,
          },
          data: {
            paid: true,
          },
        });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhook;
