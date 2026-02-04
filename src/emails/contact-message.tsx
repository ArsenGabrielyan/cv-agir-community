import EmailTemplate from "@/components/email-template"
import { Heading, Text, Markdown, Hr, Link } from "@react-email/components"
import { useTranslations } from "next-intl"

interface MessageTemplateProps{
     name: string,
     email: string,
     phone: string,
     subject: string,
     message: string,
     t: ReturnType<typeof useTranslations<"contact-email-template">>
}
export default function MessageTemplate({name,email,phone,subject,message,t}: MessageTemplateProps){
     return (
          <EmailTemplate title={t("title")} copyrightText={t("copyright-text")}>
               <Text className="text-base mb-1">
                    {t.rich("fields.name",{
                         name,
                         bold: (chunks) => <span className="font-semibold">{chunks}</span>
                    })}
               </Text>
               <Text className="text-base mb-1">
                    {t.rich("fields.email",{
                         bold: (chunks) => <span className="font-semibold">{chunks}</span>
                    })}{' '}
                    <Link href={`mailto:${email}`} className="text-blue-600 underline">
                         {email}
                    </Link>
               </Text>
               {phone && (
                    <Text className="text-base mb-1">
                         {t.rich("fields.phone",{
                              phone,
                              bold: (chunks) => <span className="font-semibold">{chunks}</span>
                         })}
                    </Text>
               )}
               <Text className="text-base mb-4">
                    {t.rich("fields.subject",{
                         subject,
                         bold: (chunks) => <span className="font-semibold">{chunks}</span>
                    })}
               </Text>
               <Hr className="border-t border-gray-300 my-4" />
               <Heading as="h2" className="text-lg font-semibold mt-4 mb-2">
                    {t("fields.message")}
               </Heading>
               <div className="text-base bg-gray-50 p-4 rounded border border-solid border-slate-300">
                    <Markdown>
                         {message}
                    </Markdown>
               </div>
               <Text className="mt-6 text-sm text-slate-500 italic">
                    {t("footer")}
               </Text>
          </EmailTemplate>
     )
}
MessageTemplate.PreviewProps = {
     name: "Arsen G.",
     email: "arsen@example.com",
     phone: "012345678",
     subject: "Message!",
     message: "Hello! Have a nice day!"
} as MessageTemplateProps