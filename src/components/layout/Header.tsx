import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Loader from "./Loader";
import Image from "next/image";


export default function Header() {
  const { data: sessionData, status } = useSession();
  if (status === "loading") return <Loader />;

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          Time Blad Capsule
        </Link>
      </div>
      <div className="flex-none gap-2">
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
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/capsule">Capsule jump</Link>
            </li>
            <li>
              <Link href="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li onClick={() => void signOut()}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
