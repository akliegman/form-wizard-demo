import { createClient } from "@vercel/postgres";
import { NextResponse } from "next/server";

import { sqlSelectUsers } from "@/app/lib/sql/users";

export async function GET() {
  const client = createClient();
  await client.connect();

  try {
    const users = await client.query(sqlSelectUsers);

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    await client.end();
  }
}
