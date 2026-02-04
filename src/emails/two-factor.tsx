import EmailTemplate from "@/components/email-template"
import {Heading, Text } from "@react-email/components"
import { useTranslations } from "next-intl"

interface TwoFactorTemplateProps{
     firstName: string,
     token: string
     t: ReturnType<typeof useTranslations<"2fa-template">>
}
export default function TwoFactorTemplate({firstName,token,t}: TwoFactorTemplateProps){
     return (
          <EmailTemplate title={t("title")} copyrightText={t("copyright-text")}>
               <Heading as="h2" className="text-xl font-semibold">{t("line1",{firstName})},</Heading>
               <Text>{t("line2")}</Text>
               <Text
                    className="text-center text-3xl font-bold tracking-widest my-4 text-blue-800 bg-blue-100 rounded-md p-4"
               >
                    {token}
               </Text>
               <div className="border-solid border-slate-300" style={{borderWidth: "1px 0"}}>
                    <Text className="text-slate-500 my-2 text-center">{t.rich("line3",{
                         bold: (chunks) => <span className="font-semibold">{chunks}</span>
                    })}</Text>
               </div>
               <Text className="mb-0">{t("line4")}</Text>
          </EmailTemplate>
     )
}
TwoFactorTemplate.PreviewProps = {
     firstName: "Arsen",
     token: "123456",
} as TwoFactorTemplateProps