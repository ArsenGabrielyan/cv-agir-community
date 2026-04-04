import { Link } from "@/i18n/routing";
import LogoImage from "../logo-image";
import { useTranslations } from "next-intl";

interface LogoProps{
     width: number,
     height: number,
     href?: string,
     isAdmin?: boolean,
     isDark?: boolean,
     title?: string
}
export default function Logo({href="/", width, height, isAdmin, title}: LogoProps){
     const navLinks = useTranslations("nav-links")
     const t = useTranslations("index")
     const logo = (
          <Link href={href} title={title ?? navLinks("home")}>
               <LogoImage width={width} height={height} className="hover:stroke-primary hover:fill-primary fill-foreground stroke-foreground"/>
          </Link>
     )
     return !isAdmin ? logo : (
          <div className="flex items-center justify-center gap-1 flex-col">
               {logo}
               <span className="text-primary dark:text-chart-1 text-lg font-semibold">{t("admin")}</span>
          </div>
     )
}