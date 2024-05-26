"use server";

import { cookies } from "next/headers";

export default async function getCookies() {
  const cookieStore = cookies();
  const role = cookieStore.get("role");
  const token = cookieStore.get("token");
  const userId = cookieStore.get("userId");
  const loggedIn = cookieStore.get("loggedIn");
  // console.log("here", role?.value, token?.value, userId?.value.slice(3, 27));

  return {
    role: role?.value,
    token: token?.value,
    userId: userId?.value?.slice(3, 27),
    loggedIn: loggedIn?.value,
  };
}
