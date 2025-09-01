"use server";

import { jwtDecode } from "jwt-decode";
import { cookies, headers } from "next/headers";
import { SignInModel } from "../(auth)/_types/auth.types";
import { JWT, UserResponse, UserSession } from "../_types/auth.types";
import { encryptSession } from "../utils/session";

export async function signinAction(model: SignInModel) {
  //get user-agent
  const headerList = headers();
  const userAgent = (await headerList).get("user-agent");

  try {
    const response = await fetch(`${process.env.API_URL}/identity/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...model, userAgent }),
    });
    if (response.ok) {
      const user = await response.json();
      await setAuthCookieAction(user);
      return { isSuccess: true, response: user };
    }
  } catch {
    return {
      isSuccess: false,
    };
  }
}

export async function setAuthCookieAction(user: UserResponse) {
  const decoded = jwtDecode<JWT>(user.accessToken);

  const session: UserSession = {
    userName: decoded.userName,
    fullName: decoded.fullName,
    pic: decoded.pic,
    exp: decoded.exp * 1000, // convert to milliseconds
    accessToken: user.accessToken,
    sessionId: user.sessionId,
    sessionExpiry: user.sessionExpiry,
  };

  // Set the cookie with the decoded JWT information

  const cookieStore = await cookies();
  const encryptedSession = await encryptSession(session);

  cookieStore.set("mehdi-session", encryptedSession, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
}
