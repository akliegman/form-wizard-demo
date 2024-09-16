import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

import { AUTH_TOKEN, COOKIE_MAX_AGE, JWT_EXPIRY } from "@/app/lib/constants";
import { User } from "@/app/lib/definitions";

export const generateToken = (userId: User["user_id"]) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: JWT_EXPIRY,
  });

  return token;
};

export const setCookieHeader = (response: NextResponse, token: string) => {
  response.cookies.set(AUTH_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
  });

  return response;
};

export const clearCookie = (response: NextResponse) => {
  response.cookies.set(AUTH_TOKEN, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
  });

  return response;
};

export const verifyToken = async (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET!, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
};

export const verifyPassword = async (
  password: string,
  existingPassword: string,
) => {
  const passwordMatch = await bcrypt.compare(password, existingPassword);

  return passwordMatch;
};
