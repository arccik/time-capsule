import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer footer-center pb-10 pt-10 text-inherit">
      <div>
        <img src="/images/logo.png" alt="" />
        <span className="font-bold text-secondary">
          Providing reliable virtual time capsules
        </span>
      </div>
      <div>
        <div className="m-none p-none grid grid-flow-col gap-4">
          <a
            href="https://www.facebook.com/profile.php?id=100093973984184"
            target="_blank"
          >
            <FaFacebook className="text-2xl" />
          </a>
          <a>
            <FaTwitter className="text-2xl" />
          </a>
          <a href="https://www.instagram.com/messagettf9/ " target="_blank">
            <FaInstagram className="text-2xl" />
          </a>
        </div>
        <p> Copyright © 2023</p>
      </div>
      <div className="flex flex-col gap-4 ">
        <Link href="/contactus">Contact Us</Link>
        <Link className="col-span-2" href="/docs/termsandconditions">
          Terms and Conditions
        </Link>
        <Link href="/docs/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
}
