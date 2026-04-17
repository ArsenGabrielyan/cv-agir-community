import { getAuditLogsList } from "@/actions/admin/logs";
import AuditLogContent from "@/admin/audit-logs";
import { IAdminSearchParams } from "@/lib/types/admin";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { cache } from "react";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: t("audit-log.title")
     }
}

const fetchAuditLogs = cache(getAuditLogsList)

export default async function AuditLogPage({searchParams}: {
     searchParams: Promise<IAdminSearchParams>
}){
     const {query, page, pageSize} = await searchParams
     const auditLogs = await fetchAuditLogs(await searchParams)
     return (
          <AuditLogContent
               pageSize={Number(pageSize ?? 20)}
               page={Number(page ?? 1)}
               data={auditLogs}
               query={query ?? ""}
          />
     )
}