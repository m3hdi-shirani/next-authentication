import { decryptSession } from "@/app/utils/session";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const encryptSession = cookieStore.get("mehdi-session")?.value;

  const decryptedSession = await decryptSession(encryptSession);

  return Response.json(decryptedSession);
}
