"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/logo-min.svg";
import profileDefault from "@/assets/images/profile.png";
import Link from "next/link";
import { Bell, Home, List, ListPlus, LogIn, Menu } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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
                <Link href="/" className="link">
                  Home
                </Link>
                <Link href="/properties" className="link">
                  Properties
                </Link>
                <Link href="/properties/add" className="link">
                  Add Property
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          <div className="hidden md:block md:ml-6">
            <div className="flex items-center">
              <button className="button">
                <LogIn className="mr-2" />
                <span>Login</span>
              </button>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged In) --> */}
          <div className="absolute inset-y-0 right-0 flex items-center md:static md:inset-auto md:ml-8 md:pr-0">
            <Link href="/messages" className="relative group">
              <button
                type="button"
                className="relative rounded-full bg-primary text-primary-foreground p-1 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
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
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={profileDefault}
                    alt="Default Profile"
                  />
                </button>
              </div>

              {isProfileMenuOpen && (
                <div
                  id="user-menu"
                  className=" absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/properties/saved"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                  >
                    Saved Properties
                  </Link>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex={-1}
                    id="user-menu-item-2"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu">
          <div className="space-y-5 px-4 pb-3 pt-2 flex flex-col items-center">
            <Link href="/" className="link flex items-center justify-center">
              Home
            </Link>
            <Link href="/properties" className="link flex">
              Properties
            </Link>
            <Link href="/properties/add" className="link flex">
              Add Property
            </Link>
            <Link href="/login" className="link flex">
              Login
            </Link>
            <hr className="w-9/12 border-b border-b-background" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
