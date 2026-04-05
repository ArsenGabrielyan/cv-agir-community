"use client"
import { ResumeTemplateCategory } from "@db";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "@/i18n/routing";
import CategoryFormModal from "@/components/admin/modal/categories/form";
import CategoryDeleteModal from "@/components/admin/modal/categories/delete";

export const CATEGORY_COLS: ColumnDef<ResumeTemplateCategory>[] = [
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
                         <Link href={`/admin/categories/${getValue()}`}>
                              {getValue() as string}
                         </Link>
                    </Button>
               )
          }
     },
     {
          accessorKey: "name",
          header: () => {
               const t = useTranslations("table.heading.categories")
               return t("name")
          }
     },
     {
          id: "actions",
          cell: ({ row }) => {
               const t = useTranslations("buttons")
               return (
                    <div className="flex items-center justify-end gap-2">
                         <CategoryFormModal
                              name={row.original.name}
                              id={row.original.id}
                              triggerBtn={(
                                   <Button variant="outline">
                                        <Edit/>
                                        {t("edit")}
                                   </Button>
                              )}
                         />
                         <CategoryDeleteModal
                              id={row.original.id}
                              triggerBtn={(
                                   <Button variant="destructive">
                                        <Trash2/>
                                        {t("delete")}
                                   </Button>
                              )}
                         />
                    </div>
               )
          },
     },
]