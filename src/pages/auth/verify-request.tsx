import React from "react";

export default function VerifyRequestPage() {
  return (
    <>
      <div className="hero min-h-[calc(100vh-70px)] bg-slate-200">
        <div className="card w-full max-w-sm flex-shrink-0 bg-slate-100 shadow-2xl">
          <div className="hero-content max-w-5xl flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold">Check your email</h1>
              <h1 className="font-bold text-secondary">To Login</h1>

              <p className="py-6">
                Please check your email for the secure login link we've just
                sent you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
