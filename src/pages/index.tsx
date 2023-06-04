import OpenCapsules from "~/components/open-capsule/OpenCapsules";
import Footer from "~/components/layout/Footer";
import Hero from "~/components/layout/Hero";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <OpenCapsules />
        <div className="hero md:h-96">
          <div className="hero-content flex-col lg:flex-row">
            <div>
              <h1 className="text-5xl font-bold">
                Create a special day in the future
              </h1>
              <p className="py-6">
                Once you have created a time capsule, filled out the recipient
                information, and choose a date for it to be sent, our system
                will store your time capsule and automatically send it out on
                the specified day.
              </p>
              <button className="btn-secondary btn">Get Started</button>
            </div>
            <Image
              width={200}
              height={200}
              src="/images/TC.png"
              className="max-w-sm rounded-lg"
              alt="TC"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
