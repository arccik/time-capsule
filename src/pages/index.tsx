import Link from "next/link";
import React from "react";

export default function index() {
  return (
    <div
      className="hero min-h-screen "
      style={{
        background:
          "linear-gradient(0deg, #570df8 0%, rgba(253,187,45,1) 100%)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Welcome to Virtual Time Capsule
          </h1>
          <p className="mb-5">
            Platform to commemorate the present time or significant events by
            gathering digital objects or information that will be preserved and
            accessible for future generations. The Coronation in 2023 represents
            a historic moment in the nation&aposs life, and utilizing an online
            or virtual capsule provides an ideal way to document and store this
            special moment in a digital format, ensuring its longevity and
            accessibility for future exploration.
          </p>
          <Link href="/capsule" className="btn-primary btn bg-[570df8]">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
