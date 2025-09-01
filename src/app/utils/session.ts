import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { UserSession } from "../_types/auth.types";

const JWT_SECRET = process.env.JWT_SECRET_env;
const encodedKey = new TextEncoder().encode(JWT_SECRET);

export async function encryptSession(session: UserSession): Promise<string> {
  return new SignJWT(session as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedKey);
}

export async function decryptSession(
  token: string
): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as UserSession & JWTPayload;
  } catch {
    return null;
  }
}
