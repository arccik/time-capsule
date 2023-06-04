import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Loader from "./Loader";
import Image from "next/image";

export default function Header() {
  const { data: sessionData, status } = useSession();

  const menuItems = (
    <>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link href="/capsule">Create a Capsule</Link>
      </li>
      <li>
        <Link href="/profile" className="justify-between">
          Profile
          <span className="badge">Beta</span>
        </Link>
      </li>
      <li onClick={() => void signOut()}>
        <a className="text-red-400">Logout</a>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          href="/"
          aria-current="page"
          aria-label="Homepage"
          className="flex-0 btn-ghost btn px-2"
        >
          <div className="inline-flex text-lg font-bold text-primary transition-all duration-200 md:text-3xl">
            <span className="lowercase">message</span>{" "}
            <span className="uppercase text-base-content">TTF</span>
          </div>
        </Link>
      </div>
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <div className="flex-none gap-2 md:hidden">
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                <div className="w-10 rounded-full">
                  {sessionData?.user.image && (
                    <Image
                      width={60}
                      height={60}
                      alt="avatar"
                      src={sessionData?.user.image}
                    />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              >
                {menuItems}
              </ul>
            </div>
          </div>

          <div className="hidden flex-none gap-2 md:block">
            <ul className="menu menu-horizontal px-1">{menuItems}</ul>
          </div>
        </>
      )}
    </div>
  );
}
