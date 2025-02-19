import connectDB from "@/config/database";
import User from "@/models/User";
import {
  AuthOptions,
  ISODateString,
  Profile,
  Session,
  DefaultSession,
} from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import type { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export type TSessionWithId = Session & {
  user: { id?: string };
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }: { profile?: GoogleProfile | Profile }) {
      if (!profile) return false;
      // 1. Connect to the database
      await connectDB();

      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });

      // 3. If not, create user
      if (!userExists) {
        // Truncate username if too long
        const username = profile.name?.slice(0, 20);

        const userToCreate = {
          email: profile.email,
          username,
          ...((profile as GoogleProfile).picture
            ? { image: (profile as GoogleProfile).picture }
            : {}),
        };

        await User.create(userToCreate);
      }

      // 4. Return true to allow sign in
      return true;
    },
    // Session callback function that modifies the session object
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: AdapterUser;
    }) {
      if (!session?.user?.email) return null as unknown as DefaultSession;

      const sessionWithId: TSessionWithId = { ...(session as TSessionWithId) };

      // 1. Get the user from database
      const userFromDB = await User.findOne({ email: session.user.email });

      // 2. Assign user ID from the session
      if (userFromDB) {
        sessionWithId.user.id = userFromDB._id.toString();
      }

      // 3. Return session
      return sessionWithId as unknown as DefaultSession;
    },
  },
};
