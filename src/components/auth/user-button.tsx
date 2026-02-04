"use client"
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger,
     DropdownMenuLabel,
     DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
     Avatar,
     AvatarImage,
     AvatarFallback
} from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/use-current-user"
import { LogoutButton } from "./logout-button"
import { User, LogOut, Settings, FileUser, FileText, LayoutDashboard, } from "lucide-react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export const UserButton = () => {
     const user = useCurrentUser();
     const t = useTranslations("user-button-links");
     const buttonTxt = useTranslations("buttons");
     return (
          <DropdownMenu modal={false}>
               <DropdownMenuTrigger>
                    <Avatar>
                         <AvatarImage src={user?.image || ""}/>
                         <AvatarFallback className="bg-primary">
                              <User className="text-primary-foreground"/>
                         </AvatarFallback>
                    </Avatar>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="pb-0">{user?.name}</DropdownMenuLabel>
                    <p className="font-normal px-2 text-sm pb-1.5">{user?.email}</p>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem asChild className="cursor-pointer">
                         <Link href="/profile">
                              <User/> {t("my-profile")}
                         </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                         <Link href="/dashboard">
                              <LayoutDashboard/> {buttonTxt("dashboard")}
                         </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                         <Link href="/dashboard?show=resume">
                              <FileUser/> {t("resumes")}
                         </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                         <Link href="/dashboard?show=cover-letter">
                              <FileText/> {t("cover-letters")}
                         </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                         <Link href="/settings">
                              <Settings/> {t("settings")}
                         </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <LogoutButton>
                         <DropdownMenuItem className="cursor-pointer text-destructive">
                              <LogOut className="h-4 w-4 mr-2 text-destructive"/>
                              {buttonTxt("sign-out")}
                         </DropdownMenuItem>
                    </LogoutButton>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}