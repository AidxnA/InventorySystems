"use client"

import { Product } from "@/lib/generated/prisma/client"
import { createColumnHelper } from "@tanstack/react-table"

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<Product>()

export const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {

    header: "Name",
  }),
  columnHelper.accessor("brand", {
    header: "Brand",
  }),
  columnHelper.accessor("category", {

    header: "Category",
  }),
  columnHelper.accessor("quantity", {

    header: "Quantity",
  }),
])