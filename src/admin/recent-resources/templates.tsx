import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFNSLocales } from "@/i18n/config";
import { formatDistanceToNow } from "date-fns";
import { CalendarRange } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

interface RecentTemplatesProps{
     data: {id: string, name: string, createdAt: Date}[]
}
export default function RecentTemplates({data}: RecentTemplatesProps){
     const locale = useLocale()
     const t = useTranslations("recent-resources")
     return (
          <Card>
               <CardHeader>
                    <CardTitle>{t("template")}</CardTitle>
               </CardHeader>
               <CardContent>
                    <ul className="space-y-3">
                         {data.map(val=>(
                              <li key={val.id} className="flex items-center justify-between gap-2 border-b pb-3 last:border-b-0 last:pb-0">
                                   <div className="flex items-center gap-2"><CalendarRange className="text-muted-foreground size-5"/>{val.name}</div>
                                   <span className="text-muted-foreground">{formatDistanceToNow(val.createdAt,{
                                        addSuffix: true,
                                        locale: dateFNSLocales[locale]
                                   })}</span>
                              </li>
                         ))}
                    </ul>
               </CardContent>
          </Card>
     )
}