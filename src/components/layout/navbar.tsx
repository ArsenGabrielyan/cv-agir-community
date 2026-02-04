"use client"
import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/components/ui/button";
import {
     NavigationMenu,
     NavigationMenuLink,
     NavigationMenuItem,
     NavigationMenuList,
     navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
     Sheet,
     SheetContent,
     SheetHeader,
     SheetTitle,
     SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NAVBAR_LINKS } from "@/lib/constants/links";
import { useState } from "react";
import { LoginButton } from "../auth/login-button";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserButton } from "../auth/user-button";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../lang-switcher";

interface NavbarProps{
     isLandingPage?: boolean,
}
interface AuthButtonProps{
     responsive?: boolean,
     className?: string,
     showUserButtonOnly?: boolean
}
function AuthButton({responsive=false,className,showUserButtonOnly=false}:AuthButtonProps){
     const buttonTxt = useTranslations("buttons");
     const user = useCurrentUser()
     return !showUserButtonOnly ? (
          <div className={cn(responsive ? "hidden xl:flex" : "flex","justify-center items-center gap-3",className)}>
               {!user ? (
                    <>
                         <LoginButton mode="modal" asChild>
                              <Button>{buttonTxt("sign-in")}</Button>
                         </LoginButton>
                         <LanguageSwitcher/>
                    </>
               ) : (
                    <>
                         <UserButton/>
                         <LanguageSwitcher/>
                    </>
               )}
          </div>
     ) : !user ? (
          <div className="flex justify-center items-center gap-2.5">
               <LoginButton mode="modal" asChild>
                    <Button>{buttonTxt("sign-in")}</Button>
               </LoginButton>
               <LanguageSwitcher/>
          </div>
     ) : (
          <div className="flex justify-center items-center gap-2.5">
               <UserButton/>
               <LanguageSwitcher/>
          </div>
     )
}
export default function Navbar({isLandingPage=false}: NavbarProps){
     const [open, setIsOpen] = useState(false)
     const t = useTranslations("index");
     const navLinks = useTranslations("nav-links")
     return (
          <header className="p-5 border-primary border-b bg-background sticky top-0 z-20 left-0 w-full flex justify-between items-center h-[80px]">
               <Logo width={160} height={45}/>
               {isLandingPage ? (
                    <>
                         <NavigationMenu className="hidden xl:flex">
                              <NavigationMenuList>
                                   {NAVBAR_LINKS.map(({id,name,href})=>(
                                        <NavigationMenuItem key={id}>
                                             <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                                  <Link href={href}>{navLinks(name)}</Link>
                                             </NavigationMenuLink>
                                        </NavigationMenuItem>
                                   ))}
                              </NavigationMenuList>
                         </NavigationMenu>
                         <Sheet open={open} onOpenChange={setIsOpen}>
                              <SheetTrigger asChild>
                                   <Button className="flex xl:hidden" variant="outline" size="icon" title={navLinks("menu")}><Menu/></Button>
                              </SheetTrigger>
                              <SheetContent className="flex flex-col items-center justify-center z-50">
                                   <SheetHeader>
                                        <SheetTitle>{t("title")}</SheetTitle>
                                   </SheetHeader>
                                   <ul className="flex flex-col items-center justify-center w-full">
                                        {NAVBAR_LINKS.map(({id,name,href})=>(
                                             <li key={id}><Link href={href} className={buttonVariants({variant: "link"})} onClick={()=>setIsOpen(false)}>{navLinks(name)}</Link></li>
                                        ))}
                                   </ul>
                                   <AuthButton className="mt-3"/>
                              </SheetContent>
                         </Sheet>
                         <AuthButton responsive/>
                    </>
               ) : (
                    <AuthButton showUserButtonOnly/>
               )}
          </header>
     )
}