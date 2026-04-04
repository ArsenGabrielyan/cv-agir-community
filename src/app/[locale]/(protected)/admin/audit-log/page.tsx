import { getAuditLogsList } from "@/actions/admin/logs";
import AuditLogContent from "@/components/admin/logs";
import { AuditLogServerData, IAdminAPISearchParams } from "@/lib/types/admin";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: t("audit-log.title")
     }
}

export default async function AuditLogPage({searchParams}: {
     searchParams: Promise<IAdminAPISearchParams<AuditLogServerData>>
}){
     const auditLogs = await getAuditLogsList(await searchParams)
     return (
          <AuditLogContent
               data={auditLogs}
          />
     )
}