"use client"
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { LangCodeType } from "@/i18n/types";
import { TemplateServerData } from "@/lib/types/resume";
import { SelectAll, SelectRow } from "@/components/data-tables/cells/select-col";
import SortableHeader from "@/components/data-tables/cells/sortable-heading";
import ActionsCell from "./actions";
import {IdCell, LocaleCell} from "./cells"

export const TEMPLATE_COLS = (categories: {name: string, id: string}[]): ColumnDef<TemplateServerData>[] => [
     {
          id: "select",
          header: ({ table }) => <SelectAll table={table}/>,
          cell: ({ row }) => <SelectRow row={row}/>,
     },
     {
          accessorKey: "id",
          header: "ID",
          cell: ({getValue}) => <IdCell id={getValue<string>()}/>
     },
     {
          accessorKey: "locale",
          header: () => {
               const t = useTranslations("table.heading.templates")
               return t("locale")
          },
          cell: ({getValue}) => <LocaleCell locale={getValue<LangCodeType>()}/>
     },
     {
          accessorKey: "name",
          header: ({column}) => {
               const t = useTranslations("table.heading.templates")
               return (
                    <SortableHeader
                         title={t("name")}
                         column={column}
                    />
               )
          }
     },
     {
          accessorKey: "description",
          header: ({column}) => {
               const t = useTranslations("table.heading.templates")
               return (
                    <SortableHeader
                         title={t("description")}
                         column={column}
                    />
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
          cell: ({row}) => row.original.category.name
     },
     {
          accessorKey: "imageName",
          header: ({column}) => {
               const t = useTranslations("table.heading.templates")
               return (
                    <SortableHeader
                         title={t("imageName")}
                         column={column}
                    />
               )
          }
     },
     {
          id: "actions",
          cell: ({ row }) => <ActionsCell
               item={row.original}
               categories={categories}
          />,
     },
]