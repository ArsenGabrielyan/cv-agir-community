import { Row, Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";

interface SelectAllProps<T>{
     table: Table<T>
}
export function SelectAll<T>({table}: SelectAllProps<T>){
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
}

interface SelectRowProps<T>{
     row: Row<T>
}
export function SelectRow<T>({row}: SelectRowProps<T>){
     const t = useTranslations("table.select");
     return (
          <Checkbox
               checked={row.getIsSelected()}
               onCheckedChange={(value) => row.toggleSelected(!!value)}
               aria-label={t("row")}
          />
     )
}