import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

const providers = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  );
}

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  );
}

export const authOptions = {
  providers,
  session: { strategy: "jwt" },
  pages: { signIn: "/auth" },
  callbacks: {
    async signIn({ user, account }) {
      try {
        await connectToDatabase();
        await User.findOneAndUpdate(
          { email: user.email },
          {
            $set: {
              name: user.name || "Passenger",
              email: user.email,
              image: user.image || "",
              provider: account?.provider || "unknown"
            },
            $setOnInsert: { createdAt: new Date() }
          },
          { upsert: true, new: true }
        );
      } catch (err) {
        console.error("[auth] signIn upsert failed:", err.message);
      }
      return true;
    },
    async session({ session }) {
      if (session?.user?.email) {
        try {
          await connectToDatabase();
          const dbUser = await User.findOne({ email: session.user.email }).lean();
          if (dbUser) session.user.id = String(dbUser._id);
        } catch {
          /* non-fatal */
        }
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};
