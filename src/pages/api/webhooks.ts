import type { NextApiResponse, NextApiRequest } from "next";
import Stripe from "stripe";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import getRawBody from "raw-body";

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
  });
  const webhookSecret: string = env.STRIPE_WEBHOOK_SECRET;
  if (req.method === "POST") {
    const body = await getRawBody(req);
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) {
        console.log("WEBHOOOK ERROR: ", err?.message);

        message = err.message;
      }
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }
    console.log("EVENT RECEIVED:", event.type);
    switch (event.type) {
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
        console.log("PAYMENT SUCCESSFULLY COMPLETED");
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
