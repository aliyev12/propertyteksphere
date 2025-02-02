"use client";
import Link from "next/link";
import { getActiveClass } from ".";

const MobileMenu = ({
  pathname,
  isLoggedIn,
}: {
  pathname: string;
  isLoggedIn: boolean;
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
        {isLoggedIn && (
          <Link
            href="/properties/add"
            className={`link ${getActiveClass(pathname, "/properties/add")}`}
          >
            Add Property
          </Link>
        )}
        {!isLoggedIn && (
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
