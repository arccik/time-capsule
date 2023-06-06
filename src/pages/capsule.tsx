import React from "react";
import Footer from "~/components/layout/Footer";
import OpenCapsules from "~/components/open-capsule/OpenCapsules";

export default function CapsulePage() {
  return (
    <>
      <main className="container  mx-auto grid grid-cols-1 gap-5 md:w-3/4 lg:w-2/4">
        <OpenCapsules />
      </main>
      <Footer />
    </>
  );
}
