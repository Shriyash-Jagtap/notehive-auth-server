// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Define NextAuth options
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // Additional NextAuth configuration options
  session: {
    strategy: "jwt", // Using JWT strategy
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
};

// Specify the runtime to 'nodejs' to support Node.js-specific modules like 'crypto'
export const runtime = 'nodejs';

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler as GET and POST for route compatibility
export { handler as GET, handler as POST };
