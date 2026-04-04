"use server"
import { logAction } from "@/data/logs";
import { AuditActionKey, AuditLogServerData, auditLogsInclude, IAdminAPISearchParams} from "@/lib/types/admin";
import { getIsAdmin, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getIpAddress } from "@/actions/ip";
import { getTranslations } from "next-intl/server";

export async function getAuditLogsList(searchParams: IAdminAPISearchParams<AuditLogServerData>){
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
     const {filter} = searchParams
     const filters = Object.keys(filter)
          .filter(key => key.startsWith("action-"))
          .map(key => filter?.[key as AuditActionKey])
          .flat();
     const data = await db.auditLog.findMany({
          where: {
               ...(filter?.q && {
                    OR: [
                         {user: {name: {contains: filter?.q, mode: "insensitive"}}},
                    ]
               }),
               ...(filters.length ? { action: { in: filters } } : {}),
               ...(filter?.fromDate || filter?.toDate ? {
                    createdAt: {
                         ...(filter?.fromDate && { gte: new Date(filter?.fromDate) }),
                         ...(filter?.toDate && { lte: new Date(filter?.toDate) }),
                    }
               } : {}),
          },
          orderBy: {
               createdAt: "desc"
          },
          include: auditLogsInclude
     });
     return data
}