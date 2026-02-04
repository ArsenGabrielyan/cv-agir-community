"use client"
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {Spinner} from "@/components/ui/spinner"
import { useTranslations } from "next-intl";

interface LoadingButtonProps extends ButtonProps{
     loading: boolean
}
export default function LoadingButton({
     loading,
     disabled,
     className,
     ...props
}: LoadingButtonProps){
     const t = useTranslations("buttons");
     return (
          <Button
               disabled={loading || disabled}
               className={cn("flex items-center gap-2",className)}
               {...props}
          >
               {loading ? <><Spinner/><span>{t("loading")}</span></> : props.children}
          </Button>
     )
}