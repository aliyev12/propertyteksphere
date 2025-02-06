import connectDB from "@/config/database";
import User from "@/models/User";
import { Profile, Session } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

type TSessionWithId = Session & { user: { id?: string } };

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
    async signIn({ profile }: { profile?: GoogleProfile }) {
      if (!profile) return false;
      console.log("@@@ profile = ", profile);

      // 1. Connect to the database
      await connectDB();

      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });

      // 3. If not, create user
      if (!userExists) {
        // Truncate username if too long
        const username = profile.name?.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      // 4. Return true to allow sign in
      return true;
    },
    // Session callback function that modifies the session object
    async session({ session }: { session: Session }) {
      if (!session?.user?.email) return null;

      const sessionWithId: TSessionWithId = { ...(session as TSessionWithId) };

      // 1. Get the user from database
      const user = await User.findOne({ email: session.user.email });

      // 2. Assign user ID from the session
      if (user) {
        sessionWithId.user.id = user._id.toString();
      }

      // 3. Return session
      return sessionWithId;
    },
  },
};
