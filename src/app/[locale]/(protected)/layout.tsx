import { redirect, routing } from "@/i18n/routing";
import { currentUser } from "@/lib/auth";
import { LocalePageProps } from "../layout";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const {auth} = NextAuth(authConfig)

export default async function RootLayout({children, params}: LocalePageProps & Readonly<{children: React.ReactNode}>){
     const {locale} = await params
     if (!hasLocale(routing.locales, locale)) {
          notFound();
     }
     const session = await auth();
     if(!session) {
          redirect({
               href: "/auth/login",
               locale
          });
          return;
     }
     const user = await currentUser();
     if(!user || !user.id) return null;
     return children
}