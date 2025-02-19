"use client";
import logo from "@/assets/images/logo-min.svg";
import { LogIn, Menu } from "lucide-react";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import MobileMenu from "./mobile-menu";
import RightSideMenu from "./right-side-menu";
import useProviders from "@/hooks/providers.hook";

type TAuthProvider = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

export function getActiveClass(pathname: string, href: string) {
  if (pathname === href) return "font-bold";
  return "";
}

const Navbar = () => {
  const { data: session } = useSession();
  const { providers } = useProviders();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileImage = session?.user?.image;
  const pathname = usePathname();

  return (
    <nav className="">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-28 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex button button-icon"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <Menu className="block h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                className="h-12 w-auto"
                src={logo}
                alt="property TEK sphere"
              />
            </Link>
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className="hidden md:ml-6 md:flex items-center">
              <div className="flex space-x-5">
                <Link
                  href="/"
                  className={`link ${getActiveClass(pathname, "/")}`}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className={`link ${getActiveClass(pathname, "/properties")}`}
                >
                  Properties
                </Link>
                {session && (
                  <Link
                    href="/properties/add"
                    className={`link ${getActiveClass(
                      pathname,
                      "/properties/add"
                    )}`}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          {!session && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                {providers &&
                  Object.values(providers).map((provider, i) => (
                    <Button key={i} onClick={() => signIn(provider.id)}>
                      <LogIn className="mr-2 -ml-[1px]" />
                      <span>Login</span>
                    </Button>
                  ))}
              </div>
            </div>
          )}

          {/* <!-- Right Side Menu (Logged In) --> */}
          {session && <RightSideMenu profileImage={profileImage} />}
        </div>
      </div>
      {isMobileMenuOpen && <MobileMenu pathname={pathname} session={session} />}
    </nav>
  );
};

export default Navbar;
