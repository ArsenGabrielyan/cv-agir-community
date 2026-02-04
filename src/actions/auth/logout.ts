"use server"
import { signOut } from "@/auth"
import { logAction } from "@/data/logs"
import { currentUser } from "@/lib/auth"
import { getIpAddress } from "@/actions/ip"
import { getTranslations } from "next-intl/server"

export const logout = async() => {
     const user = await currentUser();
     const t = await getTranslations("audit-log")
     await logAction({
          userId: user?.id,
          action: "LOGOUT",
          metadata: {
               ip: await getIpAddress(),
               email: user?.email || t("unknown-email")
          }
     })
     await signOut({redirectTo: "/auth/login"})
}