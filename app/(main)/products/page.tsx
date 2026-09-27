import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { ProductUploadForm } from '@/components/ui/Product/ProductUploadForm'
import { getProducts } from '@/lib/actions'

type Props = {}

const page = async (props: Props) => {
  const data = await getProducts()
  console.log("Products:", data)

  return (
    <div className= 'flex mx-auto mt-5'>


      <DataTable columns={columns} data={data} />
      {/* <ProductUploadForm /> */}
    </div>
  )
}

export default page