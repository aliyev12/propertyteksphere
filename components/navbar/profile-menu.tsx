"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import ThemeChanger from "./theme-changer";

const ProfileMenu = ({
  setIsProfileMenuOpen,
}: {
  setIsProfileMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      id="user-menu"
      className="absolute border right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background text-foreground py-1 shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      tabIndex={-1}
    >
      <Link
        href="/profile"
        className="block px-4 py-2 text-sm "
        role="menuitem"
        tabIndex={-1}
        id="user-menu-item-0"
        onClick={() => setIsProfileMenuOpen(false)}
      >
        Your Profile
      </Link>
      <Link
        href="/properties/saved"
        className="block px-4 py-2 text-sm "
        role="menuitem"
        tabIndex={-1}
        id="user-menu-item-2"
        onClick={() => setIsProfileMenuOpen(false)}
      >
        Saved Properties
      </Link>
      <button
        className="block px-4 py-2 text-sm "
        role="menuitem"
        tabIndex={-1}
        id="user-menu-item-2"
        onClick={() => {
          setIsProfileMenuOpen(false);
          signOut();
        }}
      >
        Sign Out
      </button>
      <div className="px-4 py-2 ">
        <ThemeChanger />
      </div>
    </div>
  );
};

export default ProfileMenu;
