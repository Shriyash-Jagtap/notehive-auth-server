// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Define NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // Add additional NextAuth configuration options here (e.g., callbacks, session, etc.)
};

// Specify the runtime to 'nodejs' to support Node.js-specific modules like 'crypto'
export const runtime = 'nodejs';

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests
export { handler as GET, handler as POST };
