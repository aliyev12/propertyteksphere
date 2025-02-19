"use client";
import useProviders from "@/hooks/providers.hook";
import { LogIn } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { getActiveClass } from ".";
import { Button } from "../ui/button";

const MobileMenu = ({
  pathname,
  session,
}: {
  pathname: string;
  session: Session | null;
}) => {
  const { providers } = useProviders();

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
        {!session &&
          providers &&
          Object.values(providers).map((provider, i) => (
            <Button key={i} onClick={() => signIn(provider.id)}>
              <LogIn className="mr-2 -ml-[1px]" />
              <span>Login</span>
            </Button>
          ))}
        <hr className="w-9/12 border-b border-b-background" />
      </div>
    </div>
  );
};

export default MobileMenu;
