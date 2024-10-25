import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextRequest, NextResponse } from 'next/server';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // Additional NextAuth options
};

// Specify the runtime for Edge
export const runtime = 'edge';

// Set up CORS headers manually
function setCorsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "https://notehive.pages.dev"); // Adjust to your frontend URL
  response.headers.set("Access-Control-Allow-Methods", "GET, HEAD, POST");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

// Export GET handler
export async function GET(req: NextRequest) {
  const response = NextResponse.next();
  setCorsHeaders(response);

  const authResponse = await NextAuth(authOptions)(req as any);
  return NextResponse.next(authResponse);
}

// Export POST handler
export async function POST(req: NextRequest) {
  const response = NextResponse.next();
  setCorsHeaders(response);

  const authResponse = await NextAuth(authOptions)(req as any);
  return NextResponse.next(authResponse);
}
