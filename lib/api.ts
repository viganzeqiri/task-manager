import { User } from "@prisma/client";

interface FetcherProps {
  url: string;
  method: "GET" | "POST";
  body?: any;
  json?: boolean;
}

const fetcher = async ({ url, method, body, json = true }: FetcherProps) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }

  return res;
};

export type RegisterProps = Pick<
  User,
  "email" | "firstName" | "lastName" | "password"
>;

export const register = async (user: RegisterProps) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false,
  });
};

export type SigninProps = Pick<User, "email" | "password">;

export const signin = async (user: SigninProps) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: false,
  });
};
