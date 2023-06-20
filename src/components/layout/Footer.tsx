import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { GiTimeTrap } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 text-inherit">
      <div>
        <GiTimeTrap className="text-5xl" />
        <p className="font-bold">
          Time Industry LTD <br />
          <span className="text-secondary">
            Providing reliable virtual time capsules
          </span>
        </p>
        <p>Copyright © 2023 - All mahovny reserved</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <Link href="/privacy-policy">Privacy Policy</Link>
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
  );
}
