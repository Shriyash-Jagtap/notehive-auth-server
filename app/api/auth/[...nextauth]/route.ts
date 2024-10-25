// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Configure NextAuth options without directly exporting them
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // Additional NextAuth configuration options if needed
};

// Specify the runtime to ensure compatibility with Vercel
export const runtime = 'nodejs';

// Create and export the NextAuth handler
const handler = NextAuth(authOptions);

// Export the handler as GET and POST for route compatibility
export { handler as GET, handler as POST };
