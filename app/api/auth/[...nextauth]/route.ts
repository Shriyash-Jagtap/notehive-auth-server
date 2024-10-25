import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Define NextAuth options without exporting them
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // Additional NextAuth options, such as callbacks, can go here if needed
};

// Configure runtime environment for the route
export const runtime = 'nodejs';

// Export GET and POST handlers directly
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
