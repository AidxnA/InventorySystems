"use client"

import { createColumnHelper } from "@tanstack/react-table"




export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<Payment>()

export const columns = columnHelper.columns([
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({row}) => {
      return  <div className="bg-green-200 font-bold text-green-500 p-3">{row.getValue("status")}</div>
    }
  
  }),
  columnHelper.accessor("email", {

    header: "Email",
  }),
  columnHelper.accessor("amount", {
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-bold">{formatted}</div>
    },
  }),
])