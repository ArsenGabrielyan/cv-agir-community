"use client"
import ThemeSettings from "@/components/theme-toggler";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { useTranslations } from "next-intl";

interface FooterProps{
     isLandingPage?: boolean,
}
export default function Footer({isLandingPage=false}: FooterProps){
     const year = new Date().getFullYear();
     const getGridClass = (count: number) => {
          return cn(
               "grid gap-3 w-full min-[400px]:w-auto",
               count >= 1 && "grid-cols-1",
               count >= 2 && "min-[400px]:grid-cols-2",
               count >= 4 && "lg:grid-cols-4",
               "pb-3"
          )
     }
     const t = useTranslations("index")
     const footerTxt = useTranslations("footer");
     const navLinks = useTranslations("nav-links")
     return (
          <footer className={cn("relative bg-background border-primary border-t p-6 z-20", !isLandingPage && "grid gap-3 grid-cols-1 md:grid-cols-2 place-items-center")}>
               {isLandingPage ? (
                    <>
                         <div className="flex justify-between items-start gap-6 flex-col md:flex-row pb-6">
                              <div className="flex flex-col space-y-3 w-full min-[450px]:w-[400px]">
                                   <Logo width={200} height={65} title={t("title")}/>
                                   <p>{t("title")} — {t("desc")}</p>
                              </div>
                              <div className={getGridClass(2)}>
                                   <div className="flex flex-col items-start justify-start w-full">
                                        <h2 className="text-xl font-semibold pb-[5px] mb-2 border-b border-foreground w-full min-[400px]:w-auto">{footerTxt("resources")}</h2>
                                        <ul className="w-full">
                                             <li><Link href="/about" className={cn(buttonVariants({variant: "link"}),"px-0")}>{navLinks("about-us")}</Link></li>
                                             <li><Link href="/templates" className={cn(buttonVariants({variant: "link"}),"px-0")}>{navLinks("templates")}</Link></li>
                                        </ul>
                                   </div>
                                   <div className="flex flex-col items-start justify-start">
                                        <h2 className="text-xl font-semibold pb-[5px] mb-2 border-b border-foreground w-full min-[400px]:w-auto">{footerTxt("support")}</h2>
                                        <ul className="w-full">
                                             <li><Link href="/contact" className={cn(buttonVariants({variant: "link"}),"px-0")}>{navLinks("contact")}</Link></li>
                                             <li><Link href="/faq" className={cn(buttonVariants({variant: "link"}),"px-0")}>{navLinks("qna")}</Link></li>
                                        </ul>
                                   </div>
                              </div>
                         </div>
                         <div className="grid gap-3 grid-cols-1 md:grid-cols-2 place-items-center border-t pt-3 text-center md:text-left">
                              <p>&copy; {year} {t("author")} — {t("all-rights-reserved")}</p>
                              <ThemeSettings/>
                         </div>
                    </>
               ) : (
                    <>
                         <Logo width={200} height={65}/>
                         <p>&copy; {year} {t("author")} — {t("all-rights-reserved")}</p>
                    </>
               )}
          </footer>
     )
}