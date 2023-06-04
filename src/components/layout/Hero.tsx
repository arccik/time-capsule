import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          width={359}
          height={469}
          alt="Time Capsule old"
          src="/images/locked_in_a_time.png"
          className="max-w-sm rounded-lg"
        />
        <div>
          <h1 className="text-5xl font-bold">Virtual Time Capsule</h1>
          <p className="py-6">
            Platform to commemorate the present time or significant events by
            gathering digital objects or information that will be preserved and
            accessible for future generations.
          </p>
          <Link href="/capsule" className="btn-primary btn bg-[570df8]">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
