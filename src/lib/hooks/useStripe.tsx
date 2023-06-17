import { type Stripe, loadStripe } from "@stripe/stripe-js";

import { useMemo } from "react";
import { env } from "~/env.mjs";

const useStripe = () => {
  const stripe = useMemo<Promise<Stripe | null>>(
    () => loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    []
  );

  return stripe;
};

export default useStripe;
