import React from "react";
import { FaSlackHash, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="footer footer-center bg-primary p-10 text-primary-content">
      <div>
        <FaSlackHash className="text-5xl" />
        <p className="font-bold">
          Time Capsule Industry LTD <br />
          <span className="text-secondary">
            Providing reliable virtual time capsules
          </span>
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
  );
}
