"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo-min.svg";
import profileDefault from "@/assets/images/profile.png";
import Link from "next/link";
import { Bell, Home, List, ListPlus, LogIn, Menu, User } from "lucide-react";
import { usePathname } from "next/navigation";
import ProfileMenu from "./profile-menu";
import MobileMenu from "./mobile-menu";

export function getActiveClass(pathname: string, href: string) {
  if (pathname === href) return "font-bold";
  return "";
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  console.log("pathname = ", pathname);

  const userImageExists = false;

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
                {isLoggedIn && (
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
          {!isLoggedIn && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                <button className="button button-primary">
                  <LogIn className="mr-2 -ml-[1px]" />
                  <span>Login</span>
                </button>
              </div>
            </div>
          )}

          {/* <!-- Right Side Menu (Logged In) --> */}
          {isLoggedIn && (
            <div className="absolute inset-y-0 right-0 flex items-center md:static md:inset-auto md:ml-8 md:pr-0">
              <Link href="/messages" className="relative group">
                <button type="button" className="relative button button-icon">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <Bell className="h-6 w-6" />
                </button>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  2
                  {/* <!-- Replace with the actual number of notifications --> */}
                </span>
              </Link>
              {/* <!-- Profile dropdown button --> */}
              <div className="relative ml-8">
                <div>
                  <button
                    type="button"
                    className={`relative ${
                      !userImageExists ? "button button-icon" : ""
                    }`}
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  >
                    {!userImageExists && <User />}
                    {userImageExists && (
                      <>
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={profileDefault}
                          alt="Default Profile"
                        />
                      </>
                    )}
                  </button>
                </div>

                {isProfileMenuOpen && <ProfileMenu />}
              </div>
            </div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu pathname={pathname} isLoggedIn={isLoggedIn} />
      )}
    </nav>
  );
};

export default Navbar;
