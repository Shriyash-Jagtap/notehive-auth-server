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
  session: {
    strategy: "jwt", // Using JWT for session management
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
  },
  callbacks: {
    /**
     * Redirect callback to control where users are sent after sign in/out.
     */
    async redirect({ url, baseUrl }) {
      // Allow relative URLs or specific external URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allow URLs from the frontend domain
      if (url.startsWith("https://notehive.pages.dev")) return url;
      return baseUrl;
    },
  },
};

// Specify the runtime to 'nodejs' to support Node.js-specific modules like 'crypto'
export const runtime = 'nodejs';

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler as GET and POST for route compatibility
export { handler as GET, handler as POST };
