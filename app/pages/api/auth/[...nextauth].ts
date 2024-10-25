// ./pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
  origin: "https://your-cloudflare-frontend-domain.com", // Replace with your Cloudflare Pages domain
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // Add other NextAuth options as needed
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Run CORS middleware
  await runMiddleware(req, res, cors);

  return NextAuth(req, res, authOptions);
}
