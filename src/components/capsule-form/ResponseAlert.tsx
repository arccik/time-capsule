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
        message: "Continue to write and checkout when you are ready.",
      });
    }
  }, []);

  const handleShow = () => {
    setShow(false);
    router.replace({ query: "" });
  };

  if (!show) return null;
  return (
    <div className="mx-auto">
      {response && (
        <div
          className={`alert ${
            response.success ? "alert-success" : "alert-error"
          }  mt-4 flex  flex-row `}
        >
          <div>
            <h3 className="font-bold">{response.title}</h3>
            <div className="text-xs">{response.message}</div>
            <button
              onClick={handleShow}
              className="btn-ghost btn-circle btn ml-2"
            >
              <GrFormClose />
            </button>
          </div>
          <span></span>
        </div>
      )}
    </div>
  );
}
