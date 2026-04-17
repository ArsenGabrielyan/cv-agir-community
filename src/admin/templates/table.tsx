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
import { useState, useTransition } from "react"
import { DataTablePagination } from "../../components/data-tables/pagination"
import { DataTableProps } from "@/lib/types"
import { DataTableViewOptions } from "../../components/data-tables/col-toggle"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Download, FilterX, Plus, SearchIcon, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { TemplateServerData } from "@/lib/types/resume"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { exportCSV } from "@/lib/helpers"
import TemplateFormModal from "./modal"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { deleteTemplates } from "@/actions/admin/templates"
import { toast } from "sonner"
import { useRouter } from "@/i18n/routing"

export default function TemplatesTable({ columns, data, searchColumn="name", categories }: DataTableProps<TemplateServerData> & {categories: {name: string, id: string}[]}){
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
          const headers = [...table.getFlatHeaders().map(val=>val.id).filter(val=>val!=="select" && val!=="actions"),"htmlTemplate","cssStyle","createdAt","updatedAt"]
          exportCSV({
               headers,
               data,
               fileName: "templates"
          })
     }
     const selectedRows = table.getSelectedRowModel().rows
     const selectedIds = selectedRows.map(row => row.original.id)
     const router = useRouter()
     const errMsg = useTranslations("error-messages")
     const dialogTxt = useTranslations("admin.dialog")
     const [isPending, startTransition] = useTransition()
     const onAccept = () => {
          startTransition(async()=>{
               try {
                    if(!selectedIds) return
                    const result = await deleteTemplates(selectedIds)
                    if(result.error) toast.error(result.error);
                    if(result.success) {
                         setRowSelection([])
                         router.refresh()
                    }
               } catch (err) {
                    toast.error(errMsg("unknownError"))
                    console.error(err)
               }
          })
     }
     return (
          <div className="space-y-2">
               <div className="flex items-center justify-between gap-4 w-full">
                    <div className="flex items-center gap-2">
                         <InputGroup className="max-w-lg">
                              <InputGroupInput
                                   placeholder={t("filter.templates")}
                                   value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
                                   onChange={(event)=>table.getColumn(searchColumn)?.setFilterValue(event.target.value)}
                              />
                              <InputGroupAddon>
                                   <SearchIcon/>
                              </InputGroupAddon>
                         </InputGroup>
                         <Select
                              value={(table.getColumn("categoryId")?.getFilterValue() as string) ?? ""}
                              onValueChange={val=>table.getColumn("categoryId")?.setFilterValue(val)}
                         >
                              <SelectTrigger>
                                   <SelectValue placeholder={t("heading.templates.category")}/>
                              </SelectTrigger>
                              <SelectContent>
                                   {categories.map(category=>(
                                        <SelectItem value={category.id} key={category.id}>
                                             {category.name}
                                        </SelectItem>
                                   ))}
                              </SelectContent>
                         </Select>
                    </div>
                    <div className="flex items-center gap-2">
                         {columnFilters.length>0 && (
                              <Button variant="destructive" onClick={()=>setColumnFilters([])}>
                                   <FilterX/>
                                   {btnTxt("clear-filters")}
                              </Button>
                         )}
                         <TemplateFormModal
                              categories={categories}
                              triggerBtn={(
                              <Button variant="outline">
                                   <Plus/>
                                   {btnTxt("create")}
                              </Button>
                         )} />
                         <Button variant="outline" onClick={()=>exportCsv()}>
                              <Download/>
                              {btnTxt("export")}
                         </Button>
                         <DataTableViewOptions table={table}/>
                    </div>
               </div>
               {selectedRows.length > 0 && (
                    <div className="py-2 px-4 border shadow-md rounded-md bg-card text-card-foreground flex items-center justify-between gap-4">
                         <span className="text-sm text-muted-foreground">{t("rows.templates",{
                              count: selectedRows.length.toString()
                         })}</span>
                         <AlertDialog>
                              <AlertDialogTrigger asChild>
                                   <Button variant="destructive">
                                        <Trash2/>
                                        {btnTxt("delete")}
                                   </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                   <AlertDialogHeader>
                                        <AlertDialogTitle>{dialogTxt("template.plural")}</AlertDialogTitle>
                                        <AlertDialogDescription>{dialogTxt("desc")}</AlertDialogDescription>
                                   </AlertDialogHeader>
                                   <AlertDialogFooter>
                                        <AlertDialogAction
                                             variant="destructive"
                                             onClick={onAccept}
                                             disabled={isPending}
                                        >
                                             <Trash2/>
                                             {btnTxt("delete")}
                                        </AlertDialogAction>
                                        <AlertDialogCancel>
                                             {btnTxt("close")}
                                        </AlertDialogCancel>
                                   </AlertDialogFooter>
                              </AlertDialogContent>
                         </AlertDialog>
                    </div>
               )}
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
                                             {t("not-found.templates")}
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