import { DataTable } from './data-table'
import { columns } from './columns'
import { ProductUploadDialog } from '@/components/ui/Product/ProductUploadDialog'
import { getProducts } from '@/lib/actions'

const page = async () => {
  const data = await getProducts()
 console.log("Products:", data)
 
  return (
    <div className="mx-auto mt-5 w-full max-w-7xl px-4">
      <div className="mb-4 flex justify-end">
        <ProductUploadDialog />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default page