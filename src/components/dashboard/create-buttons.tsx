"use client"
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface CreateButtonProps{
     className?: string
}
export function CreateResumeButton({className}: CreateButtonProps){
     const t = useTranslations("dashboard.buttons")
     const buttonClass = cn("flex items-center gap-2",className)
     return (
          <Button asChild className={buttonClass}>
               <Link href="/editor">
                    <PlusCircle className="size-5"/> {t("create-resume")}
               </Link>
          </Button>
     )
}


export function CreateCoverLetterButton({className}: CreateButtonProps){
     const t = useTranslations("dashboard.buttons")
     const buttonClass = cn("flex items-center gap-2",className)
     return (
          <Button asChild className={buttonClass}>
               <Link href="/editor/cover-letter">
                    <PlusCircle className="size-5"/> {t("create-cover-letter")}
               </Link>
          </Button>
     )
}