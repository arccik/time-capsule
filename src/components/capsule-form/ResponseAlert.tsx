import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";

export default function ResponseAlert() {
  const [show, setShow] = useState(true);
  const [response, setResponse] = useState<{
    success: boolean;
    message: string;
    title: string;
  } | null>(null);
  const router = useRouter();
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setResponse({
        success: true,
        title: "Success!",
        message: "Order placed! You will receive an email confirmation.",
      });
    }
    if (query.get("canceled")) {
      setResponse({
        success: false,
        title: "Order Canceled",
        message: "You can come back to complete your payment at any time",
      });
    }
  }, []);

  const handleShow = () => {
    setShow(false);
    router
      .replace({ query: "" })
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
  };

  if (!show) return null;
  return (
    <div className="m-10 mx-auto">
      {response && (
        <div
          className={`alert ${
            response.success ? "alert-success" : "alert-error"
          }  mt-4 flex  flex-row `}
        >
          <div className="flex-1 justify-between">
            <h3 className="font-bold">{response.title}</h3>
            <div className="text-xs">{response.message}</div>
          </div>
          <button onClick={handleShow} className="btn-ghost btn-circle btn">
            <GrFormClose />
          </button>
        </div>
      )}
    </div>
  );
}
