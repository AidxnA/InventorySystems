"use client"

import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { features, type DataTableFeatures } from "./data-table-features"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"






interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  currentPage: number
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  currentPage
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  })

const islastPage = data.length < 10

const router = useRouter()
const nextPage = () => {
  router.push(`/products?page=${currentPage + 1}`)
}
const previousPage = () => {
  router.push(`/products?page=${currentPage - 1}`)
}

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-purple-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className= 'font-bold'>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                )
              })}
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
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
       <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => previousPage()}

   
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
            onClick={() => nextPage()}
            disabled={islastPage}
        >
          Next
        </Button>

       
        
      </div>
    </div>
  )
}



