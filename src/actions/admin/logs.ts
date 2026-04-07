"use server"
import { logAction } from "@/data/logs";
import { auditLogsInclude, IAdminSearchParams} from "@/lib/types/admin";
import { getIsAdmin, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getIpAddress } from "@/lib/ip";
import { getTranslations } from "next-intl/server";
import { Prisma } from "@db";

export async function getAuditLogsList(searchParams: IAdminSearchParams){
     const isAdmin = await getIsAdmin();
     const ip = await getIpAddress();
     const user = await currentUser();
     const errMsg = await getTranslations("error-messages");
     if(!user || !user.id){
          await logAction({
               action: "UNAUTHORIZED",
               metadata: {
                    ip,
                    route: "server-action:audit-log",
               }
          })
          throw new Error(errMsg("auth.unauthorized"))
     }
     if(!isAdmin){
          await logAction({
               userId: user.id,
               action: "NO_ADMIN_ACCESS",
               metadata: {
                    ip,
                    route: "server-action:audit-log",
                    method: "GET",
               }
          })
          throw new Error(errMsg("auth.noAdminAccess"))
     }
     const {query} = searchParams
     const where = {
          ...(query && {
               user: {
                    name: {
                         contains: query,
                              mode: "insensitive",
                         },
                    },
               }
          ),
     } satisfies Prisma.AuditLogWhereInput;
     const data = await db.auditLog.findMany({
          where,
          orderBy: { createdAt: "desc" },
          include: auditLogsInclude,
     })
     return data
}