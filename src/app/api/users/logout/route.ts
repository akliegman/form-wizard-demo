import { NextResponse } from "next/server";

import { clearCookie } from "@/app/lib/helpers/auth";

export async function GET() {
  const response = NextResponse.json(
    { message: "Logged out" },
    { status: 200 },
  );

  clearCookie(response);

  return response;
}
