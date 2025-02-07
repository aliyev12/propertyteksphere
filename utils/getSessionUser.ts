import { getServerSession } from "next-auth/next";
import { authOptions, TSessionWithId } from "./authOptions";

export async function getSessionUser(): Promise<{
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  userId: string | undefined;
} | null> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;

  return {
    user: session.user,
    userId: session.user.id,
  };
}
