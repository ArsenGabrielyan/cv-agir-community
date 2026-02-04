import { Link } from "@/i18n/routing";
import LogoImage from "../logo-image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface LogoProps{
     width: number,
     height: number,
     href?: string,
     isAdmin?: boolean,
     isDark?: boolean,
     title?: string
}
export default function Logo({href="/",width,height,isAdmin, isDark, title}: LogoProps){
     const navLinks = useTranslations("nav-links")
     return (
          <Link href={href} title={title ?? navLinks("home")}>
               <LogoImage width={width} height={height} className={cn("hover:stroke-primary hover:fill-primary",!isAdmin ? "fill-foreground stroke-foreground" : isDark ? "fill-white stroke-white" : "fill-black stroke-black")}/>
          </Link>
     )
}