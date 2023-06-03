import OpenCapsules from "~/components/open-capsule/OpenCapsules";
import { FaSlackHash, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-">
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/images/locked_in_a_time.png"
            className="max-w-sm rounded-lg"
          />
          <div>
            <h1 className="text-5xl font-bold">Virtual Time Capsule</h1>
            <p className="py-6">
              Platform to commemorate the present time or significant events by
              gathering digital objects or information that will be preserved
              and accessible for future generations.
            </p>
            <Link href="/capsule" className="btn-primary btn bg-[570df8]">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <OpenCapsules />
      <footer className="footer footer-center bg-primary p-10 text-primary-content">
        <div>
          <FaSlackHash className="text-5xl" />
          <p className="font-bold">
            Time Capsule Industry LTD <br />
            Providing reliable virtual time capsules
          </p>
          <p>Copyright © 2023 - All mahovny reserved</p>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaTwitter className="text-2xl" />
            </a>
            <a>
              <FaYoutube className="text-2xl" />
            </a>
            <a>
              <FaFacebook className="text-2xl" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
