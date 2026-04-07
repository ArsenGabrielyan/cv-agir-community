import { headers } from "next/headers";
import { cache } from "react";

export const getIpAddress = cache(async(): Promise<string | null> => {
     const header = await headers();
     const forwardedFor = header.get("x-forwarded-for");
     const realIp = header.get("x-real-ip");
     const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp ? realIp.trim() : null;
     return ip === "::1" ? "127.0.0.1" : ip;
})