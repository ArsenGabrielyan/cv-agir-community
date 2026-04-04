"use client"
import {
     ColumnFiltersState,
     flexRender,
     getCoreRowModel,
     getFilteredRowModel,
     getPaginationRowModel,
     getSortedRowModel,
     SortingState,
     useReactTable,
     VisibilityState
} from "@tanstack/react-table"
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { DataTablePagination } from "../pagination"
import { DataTableProps } from "@/lib/types"
import { DataTableViewOptions } from "../col-toggle"
import { ResumeTemplateCategory } from "@db"
import { useTranslations } from "next-intl"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { Download, FilterX, Plus, SearchIcon } from "lucide-react"
import { escapeCSV } from "@/lib/helpers"
import { Button } from "@/components/ui/button"

export default function CategoriesTable({ columns, data, searchColumn = "name" }: DataTableProps<ResumeTemplateCategory>){
     const [sorting, setSorting] = useState<SortingState>([]);
     const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
     const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
     const [rowSelection, setRowSelection] = useState({})
     const table = useReactTable({
          data,
          columns,
          onSortingChange: setSorting,
          onColumnFiltersChange: setColumnFilters,
          onColumnVisibilityChange: setColumnVisibility,
          onRowSelectionChange: setRowSelection,
          getCoreRowModel: getCoreRowModel(),
          getPaginationRowModel: getPaginationRowModel(),
          getSortedRowModel: getSortedRowModel(),
          getFilteredRowModel: getFilteredRowModel(),
          state: {
               sorting,
               columnFilters,
               columnVisibility,
               rowSelection,
          }
     })
     const t = useTranslations("table")
     const btnTxt = useTranslations("buttons")
     const exportCsv = () => {
          const headers = [...table.getFlatHeaders().map(val=>val.id).filter(val=>val!=="select" && val!=="actions"),"createdAt","updatedAt"]
          const csv = table.getRowModel().rows.map(val=>{
               const row = val.original;
               return headers.map(h=>escapeCSV(row[h as keyof typeof row])).join(",")
          });
          const blob = new Blob([[headers.join(","), ...csv].join("\n")], {type : 'text/csv'});
          const a = document.createElement('a');
          a.download = 'categories.csv';
          a.href = URL.createObjectURL(blob);
          a.addEventListener('click', () => {
               setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
          });
          a.click();
     }
     return (
          <div className="space-y-2">
               <div className="flex items-center justify-between gap-4 w-full">
                    <InputGroup className="max-w-lg">
                         <InputGroupInput
                              placeholder={t("filter.categories")}
                              value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
                              onChange={(event) => table.getColumn(searchColumn)?.setFilterValue(event.target.value) }
                         />
                         <InputGroupAddon>
                              <SearchIcon/>
                         </InputGroupAddon>
                    </InputGroup>
                    <div className="flex items-center gap-2">
                         {columnFilters.length>0 && (
                              <Button variant="destructive" onClick={()=>setColumnFilters([])}>
                                   <FilterX/>
                                   {btnTxt("clear-filters")}
                              </Button>
                         )}
                         <Button variant="outline">
                              <Plus/>
                              {btnTxt("create")}
                         </Button>
                         <Button variant="outline" onClick={()=>exportCsv()}>
                              <Download/>
                              {btnTxt("export")}
                         </Button>
                         <DataTableViewOptions table={table}/>
                    </div>
               </div>
               <div className="overflow-hidden rounded-md border w-full">
                    <Table>
                         <TableHeader>
                              {table.getHeaderGroups().map((headerGroup) => (
                                   <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                             <TableHead key={header.id}>
                                                  {header.isPlaceholder ? null : flexRender(
                                                       header.column.columnDef.header,
                                                       header.getContext()
                                                  )}
                                             </TableHead>
                                        ))}
                                   </TableRow>
                              ))}
                         </TableHeader>
                         <TableBody>
                              {table.getRowModel().rows?.length ? (
                                   table.getRowModel().rows.map((row) => (
                                        <TableRow
                                             key={row.id}
                                             data-state={row.getIsSelected() && "selected"}
                                        >
                                             {row.getVisibleCells().map((cell) => (
                                                  <TableCell key={cell.id}>
                                                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                  </TableCell>
                                             ))}
                                        </TableRow>
                                   ))
                              ) : (
                                   <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                             {t("not-found.categories")}
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </div>
               <DataTablePagination
                    table={table}
               />
          </div>
     )
}