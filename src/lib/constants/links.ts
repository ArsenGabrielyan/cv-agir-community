import { IAdminLink, INavbarLink, ISidebarLink } from "@/lib/types/links";
import { CircleHelp, LayoutDashboard, LayoutTemplate, List, ScrollText, Settings, User } from "lucide-react";
import { AdminLinks, NavLinks, SidebarLinks } from "@/lib/types/enums";

export const NAVBAR_LINKS: INavbarLink[] = [
     {id: 1, name: NavLinks.Home, href: "/#hero"},
     {id: 2, name: NavLinks.Demo, href: "/#how-it-works"},
     {id: 3, name: NavLinks.Features, href: "/#features"},
     {id: 5, name: NavLinks.Faq, href: "/#faq"},
]
export const SIDEBAR_LINKS: ISidebarLink[] = [
     {id: 1, name: SidebarLinks.Dashboard, href: "/dashboard", Icon: LayoutDashboard},
     {id: 2, name: SidebarLinks.MyProfile, href: "/profile", Icon: User},
     {id: 3, name: SidebarLinks.Templates, href: "/templates", Icon: LayoutTemplate},
     {id: 4, name: SidebarLinks.Support, Icon: CircleHelp, dropdown: [
          { id: 1, name: NavLinks.QNA, href: '/faq',},
          { id: 2, name: NavLinks.Contact, href: "/contact", },
          { id: 3, name: NavLinks.About, href: "/about",},
     ]},
     {id: 5, name: SidebarLinks.Settings, href: "/settings", Icon: Settings}
]
export const ADMIN_LINKS: IAdminLink[] = [ // TODO: Change to /admin
     {id: 1, name: AdminLinks.Templates, href: "/admin/templates", Icon: LayoutTemplate},
     {id: 2, name: AdminLinks.Categories, href: "/admin/categories", Icon: List},
     {id: 3, name: AdminLinks.AuditLog, href: "/admin/audit-log", Icon: ScrollText},
]