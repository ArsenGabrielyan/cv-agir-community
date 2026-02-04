import EmailTemplate from "@/components/email-template"
import {Button, Heading, Text, Link } from "@react-email/components"
import { useTranslations } from "next-intl"

interface PassResetTemplateProps{
     firstName: string,
     resetLink: string,
     t: ReturnType<typeof useTranslations<"pass-reset-template">>
}
export default function PassResetTemplate({firstName,resetLink,t}: PassResetTemplateProps){
     return (
          <EmailTemplate title={t("title")} copyrightText={t("copyright-text")}>
               <Heading as="h2" className="text-xl font-semibold">{t("line1",{firstName})},</Heading>
               <Text>{t("line2")}</Text>
               <Text className="text-center">
                    <Button
                         href={`${resetLink}`}
                         className="inline-block rounded-md text-sm font-medium bg-blue-500 text-white shadow px-4 py-3"
                         style={{
                              textAlign: "center",
                              minWidth: "200px",
                         }}
                    >
                         {t("reset-link")}
                    </Button>
               </Text>
               <div className="border-solid border-slate-300" style={{borderWidth: "1px 0"}}>
                    <Text className="text-slate-500 my-2 text-center">{t("line3")} <Link href={`${resetLink}`}>{resetLink}</Link></Text>
               </div>
               <Text className="mb-0">{t("line4")}</Text>
          </EmailTemplate>
     )
}
PassResetTemplate.PreviewProps = {
     firstName: "Arsen",
     resetLink: "https://example.com",
} as PassResetTemplateProps