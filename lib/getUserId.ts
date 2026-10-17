import * as jose from "jose";
import type { NextRequest } from "next/server";

export async function getUserId(request: NextRequest): Promise<string | null> {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;

  try {
    const token = header.split(" ")[1];
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return (payload.userId as string) ?? null;
  } catch {
    return null; 
  }
}