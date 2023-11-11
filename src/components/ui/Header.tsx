import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { TfiMenu } from "react-icons/tfi";
import HelpDialog from "./HelpDialog";

export default function Header() {
  const { data: sessionData, status } = useSession();

  const menuItems =
    status === "authenticated" ? (
      <>
        {sessionData.user.role === "ADMIN" && (
          <li>
            <Link href="/auth/admin-panel" className="justify-between">
              Admin Panel
              <span className="badge badge-primary">Boss</span>
            </Link>
          </li>
        )}
        <li tabIndex={0}>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/messages"> Public Messages</Link>
        </li>
        <li>
          <Link href="/profile" className="justify-between">
            Profile
            <span className="badge">Beta</span>
          </Link>
        </li>
        <li onClick={() => void signOut({ callbackUrl: "/" })}>
          <a className="text-red-400">Logout</a>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link href="/">Write a Message</Link>
        </li>
        <li>
          <Link href="/messages">Public Messages</Link>
        </li>

        <li>
          <Link href="/contactus">Contact Us</Link>
        </li>
        <li>
          <Link href="/auth/login">Login</Link>
        </li>
      </>
    );

  return (
    <div className=" navbar duration-500">
      <div className="flex-1">
        <Link
          href="/"
          aria-current="page"
          aria-label="Homepage"
          className="flex-0 btn btn-ghost text-xl normal-case"
        >
          {/* <img src="/images/logo.png" className="scale-75" alt="logo" /> */}
          message <span className="-ml-2 font-extrabold text-primary">TTF</span>
        </Link>
      </div>
      {/* <HelpDialog /> */}
      <HelpDialog />

      <div className="flex-none gap-2 md:hidden">
        <div className="dropdown-end dropdown">
          {sessionData?.user.image ? (
            <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
              <div className="w-10 rounded-full">
                <Image
                  width={60}
                  height={60}
                  alt="avatar"
                  src={sessionData?.user.image}
                />
              </div>
            </label>
          ) : (
            <TfiMenu className="m-2 cursor-pointer text-xl" tabIndex={0} />
          )}
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box z-[1] mt-5 w-52 bg-slate-100 p-2 shadow"
          >
            {menuItems}
          </ul>
        </div>
      </div>

      <div className="hidden flex-none gap-2 md:block">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
    </div>
  );
}
