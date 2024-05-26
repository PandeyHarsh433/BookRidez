import { cookies } from "next/headers";

export async function GET(request) {
  const cookieStore = cookies();

  const role = cookieStore.get("role")?.value;
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value?.slice(3, 27);
  const loggedIn = cookieStore.get("loggedIn")?.value;

  console.log(role, token, userId, loggedIn);
  console.log();

  return Response.json(
    {
      role,
      token,
      userId,
      loggedIn,
    },
    { status: 200 }
  );
}
