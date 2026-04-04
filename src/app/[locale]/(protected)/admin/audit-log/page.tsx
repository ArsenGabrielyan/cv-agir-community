import AuditLogContent from "@/components/admin/logs";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("admin")
     return {
          title: t("audit-log.title")
     }
}

export default async function AuditLogPage(){
     return (
          <AuditLogContent/>
     )
}