"use client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircleFlagLanguage } from "react-circle-flags";
import { useTranslations } from "next-intl";
import { LangCodeType } from "@/i18n/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TemplateServerData } from "@/lib/types/resume";
import { Link } from "@/i18n/routing";
import TemplateFormModal from "@/components/admin/modal/templates/form";
import TemplateDeleteModal from "@/components/admin/modal/templates/delete";

export const TEMPLATE_COLS = (categories: {name: string, id: string}[]): ColumnDef<TemplateServerData>[] => [
     {
          id: "select",
          header: ({ table }) => {
               const t = useTranslations("table.select");
                    return (
                    <Checkbox
                         checked={
                              table.getIsAllPageRowsSelected() ||
                              (table.getIsSomePageRowsSelected() && "indeterminate")
                         }
                         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                         aria-label={t("all")}
                    />
               )
          },
          cell: ({ row }) => {
               const t = useTranslations("table.select");
                    return (
                    <Checkbox
                         checked={row.getIsSelected()}
                         onCheckedChange={(value) => row.toggleSelected(!!value)}
                         aria-label={t("row")}
                    />
               )
          },
     },
     {
          accessorKey: "id",
          header: "ID",
          cell: ({getValue}) => {
               return (
                    <Button variant="link" asChild className="p-0! max-w-xs truncate">
                         <Link href={`/admin/templates/${getValue()}`}>
                              {getValue() as string}
                         </Link>
                    </Button>
               )
          }
     },
     {
          accessorKey: "locale",
          header: () => {
               const t = useTranslations("table.heading.templates")
               return t("locale")
          },
          cell: ({getValue}) => {
               const locale = getValue() as LangCodeType
               const t = useTranslations("langs")
               return (
                   <Tooltip>
                         <TooltipTrigger className="flex items-center justify-center">
                              <CircleFlagLanguage languageCode={locale ?? "xx"} width={16} height={16}/>
                         </TooltipTrigger>
                         <TooltipContent>{t(locale ?? "unknown")}</TooltipContent>
                   </Tooltip>
               )
          }
     },
     {
          accessorKey: "name",
          header: ({column}) => {
               const t = useTranslations("table.heading.templates")
               return (
                    <span className="inline-flex items-center gap-2">
                         {t("name")}
                         <Button
                              variant="ghost"
                              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                              size="icon-sm"
                         >
                              {column.getIsSorted() === "asc" ? <ArrowUp/> : column.getIsSorted() === "desc" ? <ArrowDown/> : <ArrowUpDown/>}
                         </Button>
                    </span>
               )
          }
     },
     {
          accessorKey: "description",
          header: ({column}) => {
               const t = useTranslations("table.heading.templates")
               return (
                    <span className="inline-flex items-center gap-2">
                         {t("description")}
                         <Button
                              variant="ghost"
                              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                              size="icon-sm"
                         >
                              {column.getIsSorted() === "asc" ? <ArrowUp/> : column.getIsSorted() === "desc" ? <ArrowDown/> : <ArrowUpDown/>}
                         </Button>
                    </span>
               )
          },
          cell: ({getValue}) => {
               return <div className="max-w-xl truncate">
                    {getValue() as string}
               </div>
          }
     },
     {
          accessorKey: "categoryId",
          header: () => {
               const t = useTranslations("table.heading.templates")
               return t("category")
          },
          cell: ({getValue, row}) => {
               return (
                    <Button variant="link" asChild className="p-0!">
                         <Link href={`/admin/categories/${getValue()}`}>
                              {row.original.category.name}
                         </Link>
                    </Button>
               )
          }
     },
     {
          accessorKey: "imageName",
          header: ({column}) => {
               const t = useTranslations("table.heading.templates")
               return (
                    <span className="inline-flex items-center gap-2">
                         {t("imageName")}
                         <Button
                              variant="ghost"
                              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                              size="icon-sm"
                         >
                              {column.getIsSorted() === "asc" ? <ArrowUp/> : column.getIsSorted() === "desc" ? <ArrowDown/> : <ArrowUpDown/>}
                         </Button>
                    </span>
               )
          }
     },
     {
          id: "actions",
          cell: ({ row }) => {
               const t = useTranslations("table.actions")
               const btnTxt = useTranslations("buttons")
               return (
                    <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                   <span className="sr-only">{t("menu")}</span>
                                   <MoreHorizontal className="h-4 w-4" />
                              </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end">
                              <DropdownMenuLabel>{t("title")}</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <TemplateFormModal
                                   data={row.original}
                                   categories={categories}
                                   id={row.original.id}
                                   triggerBtn={(
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                             <Edit/>
                                             {btnTxt("edit")}
                                        </DropdownMenuItem>
                                   )}
                              />
                              <TemplateDeleteModal
                                   id={row.original.id}
                                   triggerBtn={(
                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                             <Trash2 className="text-destructive"/>
                                             {btnTxt("delete")}
                                        </DropdownMenuItem>
                                   )}
                              />
                         </DropdownMenuContent>
                    </DropdownMenu>
               )
          },
     },
]