"use client";
import { Bell, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProfileMenu from "./profile-menu";

const RightSideMenu = ({ profileImage }: { profileImage?: string | null }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <div className="absolute inset-y-0 right-0 flex items-center md:static md:inset-auto md:ml-8 md:pr-0">
      <Link href="/messages" className="relative group">
        <button type="button" className="relative button button-icon">
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" />
        </button>
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          2{/* <!-- Replace with the actual number of notifications --> */}
        </span>
      </Link>
      {/* <!-- Profile dropdown button --> */}

      <div className="relative ml-8">
        <div>
          <button
            type="button"
            className={`relative ${
              !profileImage ? "button button-icon" : "flex"
            }`}
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
          >
            {!profileImage && <User />}
            {profileImage && (
              <>
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <Image
                  className="h-10 w-10 rounded-full"
                  src={profileImage}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Default Profile"
                />
              </>
            )}
          </button>
        </div>

        {isProfileMenuOpen && (
          <ProfileMenu setIsProfileMenuOpen={setIsProfileMenuOpen} />
        )}
      </div>
    </div>
  );
};

export default RightSideMenu;
