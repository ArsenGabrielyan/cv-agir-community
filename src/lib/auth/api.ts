import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { publicRoutes, dynamicRoutes, apiAuthPrefix } from "@/routes";

export function withAuth<T>(
     handler: (req: NextRequest, context: T) => Promise<NextResponse> | NextResponse
) {
     return async (req: NextRequest, context: T) => {
          const url = new URL(req.url);
          const pathname = url.pathname;

          const isPublic =
               publicRoutes.includes(pathname) ||
               dynamicRoutes.some((regex) => regex.test(pathname)) ||
               pathname.startsWith(apiAuthPrefix);

          if (isPublic) {
               return handler(req, context);
          }

          const session = await auth();
          if (!session) {
               return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }

          return handler(req, context);
     };
}
