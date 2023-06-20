import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { TfiMenu } from "react-icons/tfi";
import HelpDialog from "../capsule-form/HelpDialog";

export default function Header() {
  const { data: sessionData, status } = useSession();

  const menuItems =
    status === "authenticated" ? (
      <>
        <li>
          <Link href="/new" className="text-secondary">
            Write a Capsule
          </Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/open-capsules"> Public Capsules</Link>
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
          <Link href="/new">Write a Capsule</Link>
        </li>
        <li>
          <Link href="/open-capsules">Public Capsules</Link>
        </li>
        <li>
          <Link href="/auth/login">Login</Link>
        </li>
      </>
    );

  return (
    <div className="navbar bg-base-100 transition-all duration-500">
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
      {/* <HelpDialog /> */}
      <HelpDialog />

      <div className="flex-none gap-2 md:hidden">
        <div className="dropdown-end dropdown">
          {sessionData?.user.image ? (
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
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
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
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
