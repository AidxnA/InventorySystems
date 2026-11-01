import { DataTable } from './data-table'
import { columns } from './columns'
import { ProductUploadDialog } from '@/components/ui/Product/ProductUploadDialog'
import { getProducts } from '@/lib/actions'



const page = async ({searchParams}:any) => {
  const params = await searchParams
  const page_number = params.page 
  

  const data = await getProducts(parseInt(page_number) || 1)
 console.log("Products:", data)
 
  return (
    <div className="mx-auto mt-5 w-full max-w-7xl px-4">
      <div className="mb-4 flex justify-end">
        <ProductUploadDialog />
      </div>
      <DataTable columns={columns} data={data}  currentPage={parseInt(page_number) || 1} />
    </div>
  )
}

export default page