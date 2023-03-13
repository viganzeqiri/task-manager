import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import { serialize } from "cookie";

export default async function signout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      serialize(process.env.COOKIE_NAME!, "", {
        maxAge: -1,
        path: "/",
      }),
    ]);

    return res.status(200).json({
      success: "Successfully logged out",
    });
  } else {
    res.status(402);
    res.json({});
  }
}
