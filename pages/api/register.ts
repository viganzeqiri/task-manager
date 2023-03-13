import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const hashedPassowrd = await hashPassword(req.body.password);

    const user = await db.user.create({
      data: {
        email: req.body.email,
        password: hashedPassowrd,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });

    if (!user) {
      res.status(401);
      res.json({});
      return;
    }

    const jwt = await createJWT(user);
    res.setHeader(
      "Set-Cookie",
      serialize(process.env.COOKIE_NAME!, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    res.status(201);
    res.json({});
  } else {
    res.status(402);
    res.json({});
  }
}
