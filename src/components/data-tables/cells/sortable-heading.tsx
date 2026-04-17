
"use client"
import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table"
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

interface SortableHeaderProps<T>{
     title: string,
     column: Column<T>
}
export default function SortableHeader<T>({title, column}: SortableHeaderProps<T>){
      return (
          <span className="inline-flex items-center gap-2">
               {title}
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