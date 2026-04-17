"use client"
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { CircleFlagLanguage } from "react-circle-flags";
import { useTranslations } from "next-intl";
import { LangCodeType } from "@/i18n/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function LocaleCell({locale}: {locale: LangCodeType}){
     const t = useTranslations("langs")
     return (
          <Tooltip>
               <TooltipTrigger className="flex items-center justify-center">
                    <CircleFlagLanguage languageCode={locale ?? "xx"} width={16} height={16}/>
               </TooltipTrigger>
               <TooltipContent>{t(locale ?? "unknown")}</TooltipContent>
          </Tooltip>
     )
}

export function IdCell({id}: {id: string}){
     return (
          <Button variant="link" asChild className="p-0! max-w-xs truncate">
               <Link href={`/admin/templates/${id}`}>
                    {id}
               </Link>
          </Button>
     )
}