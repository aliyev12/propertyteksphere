"use client";
import { Button } from "@/components/ui/button";
import useProviders from "@/hooks/providers.hook";
import { ArrowLeft, Check, LogIn, LogOut, TriangleAlert } from "lucide-react";
import Link from "next/link";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const { data: session } = useSession();
  const { providers } = useProviders();
  const searchParams = useSearchParams();
  let backTo = searchParams.get("back_to");
  backTo = backTo ? decodeURIComponent(backTo) : "";

  if (session)
    return (
      <section className="min-h-screen flex-grow">
        <div className="container m-auto max-w-2xl py-3 lg:py-24 mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="px-6 py-8 lg:py-24 shadow-md rounded-md border md:m-0">
            <div className="flex justify-center">
              <Check size={60} />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold mt-4 mb-4">Log in</h1>
              <p className="mb-4">
                You are already logged in as {session.user.name}
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                <Button
                  onClick={() => {
                    signOut();
                  }}
                >
                  <LogOut />
                  Sign Out
                </Button>
                {backTo && (
                  <Button variant="secondary" asChild>
                    <Link href={backTo}>
                      <ArrowLeft />
                      Back to previous page
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  return (
    <section className="min-h-screen flex-grow">
      <div className="container m-auto max-w-2xl py-3 lg:py-24 mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="px-6 py-8 lg:py-24 shadow-md rounded-md border md:m-0">
          <div className="flex justify-center">
            <LogIn size={60} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold mt-4 mb-4">Log in</h1>
            <p className="mb-4">
              Please, log in{" "}
              {backTo ? `in order to access "${backTo}" page` : ""}
            </p>
            {providers &&
              Object.values(providers).map((provider, i) => (
                <Button
                  key={i}
                  onClick={() => {
                    signIn(provider.id, {
                      callbackUrl: backTo || "/",
                    });
                  }}
                >
                  <LogIn />
                  <span>Login</span>
                </Button>
              ))}
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default LoginPage;
