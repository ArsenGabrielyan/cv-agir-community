import { AdminLinks, NavLinks, SidebarLinks } from "./enums";
import { LucideIconType } from ".";

export interface INavbarLink{
     id: number,
     name: NavLinks,
     href: string,
}
interface ISidebarLinkBase {
     id: number;
     name: SidebarLinks
     Icon: LucideIconType
}
interface ISidebarSimpleLink extends ISidebarLinkBase {
     href: string;
     dropdown?: never;
}
interface ISidebarDropdownLink extends ISidebarLinkBase {
     href?: never;
     dropdown: INavbarLink[];
}
export type ISidebarLink = ISidebarSimpleLink | ISidebarDropdownLink;
export interface IAdminLink{
     id: number;
     name: AdminLinks
     Icon: LucideIconType
     href: string;
}