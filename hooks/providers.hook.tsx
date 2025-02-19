"use client";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
} from "next-auth/react";
import { useEffect, useState } from "react";

type TAuthProvider = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

function useProviders() {
  const [providers, setProviders] = useState<TAuthProvider>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  return { providers };
}

export default useProviders;
