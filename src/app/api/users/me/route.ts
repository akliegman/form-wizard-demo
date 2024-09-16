import { createClient } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

import { AUTH_TOKEN } from "@/app/lib/constants";
import { verifyToken } from "@/app/lib/helpers/auth";
import { sqlSelectUserByUserId } from "@/app/lib/sql/users";

export async function GET(request: NextRequest) {
  const client = createClient();
  await client.connect();

  try {
    const cookies = request.cookies;
    const token = cookies.get(AUTH_TOKEN)?.value;

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 200 });
    }

    let decoded: { id?: string } = {};

    try {
      decoded = (await verifyToken(token)) as { id?: string };
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const { id: userId } = decoded;
    const userResult = await client.query(sqlSelectUserByUserId(userId!));

    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userResult.rows[0];

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await client.end();
  }
}
