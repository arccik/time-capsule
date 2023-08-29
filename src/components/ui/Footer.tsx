import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { GiTimeTrap } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 text-inherit">
      <div>
        {/* <GiTimeTrap className="text-5xl" /> */}
        <img src="/images/logo.png" alt="" />
        <span className="font-bold text-secondary">
          Providing reliable virtual time capsules
        </span>
      </div>
      <div>
        <div className="m-none p-none grid grid-flow-col gap-4">
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
      <div className="grid grid-flow-col gap-4">
        <Link href="/docs/termsandconditions">Terms and Conditions</Link>
        <Link href="/docs/privacy-policy">Privacy Policy</Link>
        <Link href="/contactus">Contact Us</Link>
      </div>
    </footer>
  );
}
