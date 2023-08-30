import { useState } from "react";
import ContactUsForm from "~/components/ui/ContactUsForm";

export default function ContactUs() {
  const [sent, setSent] = useState(false);
  return (
    <main className="flex min-h-screen justify-center bg-gradient-to-r from-cyan-500 to-blue-500 p-3">
      <div className=" w-full items-center py-2  md:w-2/3 ">
        <div
          className={`border-3 rounded-lg ${
            sent ? "bg-white" : "bg-slate-100"
          } p-6 pt-4 shadow-lg`}
        >
          {sent ? (
            <div className="text-center">
              <p className=" text-5xl font-bold">Message Sent</p>
              <p className="text-slate-600">
                Our team will get back to you shortly. Thank you for your
                message.
              </p>
              <img
                src="/images/email-sent.gif"
                alt="email sent"
                className="mx-auto mt-10 text-5xl text-slate-600"
              />
            </div>
          ) : (
            <ContactUsForm setSent={setSent} />
          )}
        </div>
      </div>
    </main>
  );
}
