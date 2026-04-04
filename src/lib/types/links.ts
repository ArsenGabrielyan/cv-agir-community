import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { AdminLinks, NavLinks, SidebarLinks } from "./enums";

export interface INavbarLink{
     id: number,
     name: NavLinks,
     href: string,
}
interface ISidebarLinkBase {
     id: number;
     name: SidebarLinks
     Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
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
     Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
     href: string;
}