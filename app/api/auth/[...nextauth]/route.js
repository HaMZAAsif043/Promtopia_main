import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@utils/database";
import User from "@models/user";

const handlers = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        // Find the user in the database using their email
        const sessionUser = await User.findOne({ email: session.user.email });

        if (sessionUser) {
          // Attach the user's ID to the session object
          session.user.id = sessionUser._id.toString();
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session; // Return session even if there's an error
      }
    },

    async signIn({ profile }) {
      try {
        // Connect to the database
        await connectDB();

        // Check if the user already exists
        const userExists = await User.findOne({ email: profile.email });

        // If the user doesn't exist, create a new one
        if (!userExists) {
          await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture, // Correct field for profile image
          });
        }

        return true; // Allow the sign-in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Deny sign-in if an error occurs
      }
    },
  },
});

export { handlers as GET, handlers as POST };
