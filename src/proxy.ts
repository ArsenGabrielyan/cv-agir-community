import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
     matcher: [
          '/((?!api|_next|trpc|_vercel|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|webm|png|gif|svg|ttf|mp4|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
     ],
};