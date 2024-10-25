import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: 'https://your-cloudflare-frontend.com', // Replace with your frontend's URL
});

// Helper function to run middleware with proper typing
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: NextApiRequest, res: NextApiResponse, callback: (result: unknown) => void) => void
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Define NextAuth options
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // Additional NextAuth options
};

// Specify the runtime for Node.js
export const runtime = 'nodejs';

// Export GET handler
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);
  return NextAuth(authOptions)(req, res);
};

// Export POST handler
export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);
  return NextAuth(authOptions)(req, res);
};
