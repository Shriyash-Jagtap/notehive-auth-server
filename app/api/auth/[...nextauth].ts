import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextRequest, NextResponse } from "next/server"; // Import types

// Specify Node.js runtime to support 'crypto'
export const runtime = 'nodejs';

// Define your NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",  // Ensure these are set
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // Add other NextAuth options as needed (callbacks, session, etc.)
};

// Initialize NextAuth handler
const handler = NextAuth(authOptions);

// Define GET handler with explicit types
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  return handler(req);
};

// Define POST handler with explicit types
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  return handler(req);
};
