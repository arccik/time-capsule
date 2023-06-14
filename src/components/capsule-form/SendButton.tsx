import { useSession } from "next-auth/react";
import { useEffect } from "react";

type Props = {
  disabled: boolean;
};

export default function SendButton({ disabled }: Props) {
  const { status } = useSession();

  const handlePayment = async () => {
    await fetch("/api/checkout_sessions", { method: "POST" });
  };
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <div className="grid grid-flow-col">
      {status === "authenticated" ? (
        <div>
          <button
            disabled={disabled}
            className="btn-secondary btn w-full"
            // type="submit"
            onClick={void handlePayment}
          >
            Send to the Future{" "}
            <span className="badge-outline badge ml-3">£1</span>
          </button>
        </div>
      ) : (
        <button className="btn-secondary btn w-full">
          Sign in to send the message
        </button>
      )}
    </div>
  );
}
