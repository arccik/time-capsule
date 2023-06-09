import OpenCapsules from "~/components/open-capsule/OpenCapsules";
import Footer from "~/components/layout/Footer";
import Hero from "~/components/layout/Hero";

export default function OpenCapsulesPage() {
  return (
    <>
      <main className="container mx-auto w-[800px] px-4">
        <Hero />
        <OpenCapsules />
        <div className="hero mx-auto h-[600px] w-[96%]">
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
