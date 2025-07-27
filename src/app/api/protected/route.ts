import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    return NextResponse.json({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  }

  return NextResponse.json(
    { error: "You must be signed in to view this content" },
    { status: 401 },
  );
}
