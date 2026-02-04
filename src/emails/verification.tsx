import EmailTemplate from "@/components/email-template"
import {Button, Heading, Text, Link } from "@react-email/components"
import { useTranslations } from "next-intl"

interface VerificationTemplateProps{
     firstName: string,
     confirmLink: string,
     t: ReturnType<typeof useTranslations<"verification-template">>
}
export default function VerificationTemplate({firstName,confirmLink,t}: VerificationTemplateProps){
     return (
          <EmailTemplate title={t("title")} copyrightText={t("copyright-text")}>
               <Heading as="h2" className="text-xl font-semibold">{t("line1",{firstName})},</Heading>
               <Text>{t("line2")}</Text>
               <Text className="text-center">
                    <Button
                         href={`${confirmLink}`}
                         className="inline-block rounded-md text-sm font-medium bg-blue-500 text-white shadow px-4 py-3"
                         style={{
                              textAlign: "center",
                              minWidth: "200px",
                         }}
                    >
                         {t("verification-link")}
                    </Button>
               </Text>
               <div className="border-solid border-slate-300" style={{borderWidth: "1px 0"}}>
                    <Text className="text-slate-500 my-2 text-center">{t("line3")} <Link href={`${confirmLink}`}>{confirmLink}</Link></Text>
               </div>
               <Text className="mb-0">{t("line4")}</Text>
          </EmailTemplate>
     )
}
VerificationTemplate.PreviewProps = {
     firstName: "Arsen",
     confirmLink: "https://example.com",
} as VerificationTemplateProps