import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const cookieStore = cookies();

  const role = cookieStore.get("role")?.value || null;
  const token = cookieStore.get("token")?.value || null;
  const userId = cookieStore.get("userId")?.value?.slice(3, 27) || null;
  const loggedIn = cookieStore.get("loggedIn")?.value || null;

  console.log(role, token, userId, loggedIn);

  return NextResponse.json(
    {
      role,
      token,
      userId,
      loggedIn,
    },
    { status: 200 }
  );
}
