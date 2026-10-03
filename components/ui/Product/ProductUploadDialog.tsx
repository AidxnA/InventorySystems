"use client"

import { Plus, X } from "lucide-react"
import { Dialog } from "@base-ui/react/dialog"

import { ProductUploadForm } from "@/components/ui/Product/ProductUploadForm"
import { buttonVariants } from "@/components/ui/button"

export function ProductUploadDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={buttonVariants()}>
        <Plus aria-hidden="true" />
        Add product
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[min(1000px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto outline-none">
          <Dialog.Title className="sr-only">Add product</Dialog.Title>
          <Dialog.Close
            className={`${buttonVariants({ variant: "ghost", size: "icon" })} absolute right-3 top-3 z-10`}
            aria-label="Close product upload form"
          >
            <X aria-hidden="true" />
          </Dialog.Close>
          <ProductUploadForm />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}