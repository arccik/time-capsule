import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { getSession } from "next-auth/react";
import Stripe from "stripe";
const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getSession({ req });
  console.log("POST METHOD :: userSession", userSession);
  if (req.method === "POST") {
    try {
      if (!userSession) {
        throw new Error("User not authenticated");
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: env.STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: req.headers.origin
          ? `${req.headers.origin}/?success=true`
          : "",
        cancel_url: req.headers.origin
          ? `${req.headers.origin}/?canceled=true`
          : "",
      });
      console.log("PAYMENT COMPLETED ", session);

      if (session.url) {
        return res.json({ url: session.url });
        // return res.redirect(303, session.url);
      } else {
        res.status(204).json({ message: "something not right" });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json(err.message);
      }
      res.status(500).json(err);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
