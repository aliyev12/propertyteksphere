"use client";
import Link from "next/link";
import { getActiveClass } from ".";
import { Session } from "next-auth";

const MobileMenu = ({
  pathname,
  session,
}: {
  pathname: string;
  session: Session | null;
}) => {
  return (
    <div id="mobile-menu">
      <div className="space-y-5 px-4 pb-3 pt-2 flex flex-col items-center">
        <Link href="/" className={`link flex ${getActiveClass(pathname, "/")}`}>
          Home
        </Link>
        <Link
          href="/properties"
          className={`link flex ${getActiveClass(pathname, "/properties")}`}
        >
          Properties
        </Link>
        {session && (
          <Link
            href="/properties/add"
            className={`link ${getActiveClass(pathname, "/properties/add")}`}
          >
            Add Property
          </Link>
        )}
        {!session && (
          <Link
            href="/login"
            className={`link ${getActiveClass(pathname, "/login")}`}
          >
            Login
          </Link>
        )}
        <hr className="w-9/12 border-b border-b-background" />
      </div>
    </div>
  );
};

export default MobileMenu;
