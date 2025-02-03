import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import profileDefault from "@/assets/images/profile.png";
import Link from "next/link";
import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-28 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                className="h-16 w-auto"
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
                <i className="fa-brands fa-google text-white mr-2"></i>
                <span>Login or Register</span>
              </button>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged In) --> */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-8 md:pr-0">
            <a href="messages.html" className="relative group">
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
            </a>
            {/* <!-- Profile dropdown button --> */}
            <div className="relative ml-8">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
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

              {/* <!-- Profile dropdown --> */}
              <div
                id="user-menu"
                className="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex={-1}
              >
                <a
                  href="/profile.html"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-0"
                >
                  Your Profile
                </a>
                <a
                  href="/saved-properties.html"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-2"
                >
                  Saved Properties
                </a>
                <button
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-2"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="/index.html"
            className="bg-black text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Home
          </a>
          <a
            href="/properties.html"
            className="text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Properties
          </a>
          <a
            href="/add-property.html"
            className="text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Add Property
          </a>
          <button className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-5">
            <i className="fa-brands fa-google mr-2"></i>
            <span>Login or Register</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
