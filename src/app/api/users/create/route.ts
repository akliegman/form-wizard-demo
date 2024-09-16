import { createClient } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import {
  generateToken,
  setCookieHeader,
  verifyPassword,
} from "@/app/lib/helpers/auth";
import { sqlCreateUser } from "@/app/lib/sql/users";

export async function POST(request: NextRequest) {
  const client = createClient();
  await client.connect();

  try {
    const { email, password, onboarding_step } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 },
      );
    }

    const existingUser = await client.sql`
      SELECT * FROM users WHERE email = ${email};
    `;

    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];
      const passwordMatch = await verifyPassword(password, user.password);

      if (!passwordMatch) {
        return NextResponse.json(
          { error: "Incorrect password" },
          { status: 401 },
        );
      }

      const userWithoutPassword = { ...user, password: undefined };

      let response: NextResponse = NextResponse.json(
        { user: userWithoutPassword },
        { status: 200 },
      );

      const token = await generateToken(user.user_id);
      response = setCookieHeader(response, token);

      return response;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();

    const newUser = await client.query(
      sqlCreateUser(userId, email, hashedPassword, onboarding_step),
    );

    const token = generateToken(newUser.rows[0].user_id);

    let response: NextResponse = NextResponse.json(
      { user: newUser.rows[0] },
      { status: 201 },
    );

    response = await setCookieHeader(response, token);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the user" },
      { status: 500 },
    );
  } finally {
    await client.end();
  }
}
