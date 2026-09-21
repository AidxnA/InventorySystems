"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"
import { Category } from "@/lib/generated/prisma/enums"


const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),

  brand: z.string().min(1, {
    message: "Brand is required",
  }),

category: z.enum(Category),

  description: z.string().optional(),

  quantity: z.coerce.number().min(0, {
    message: "Quantity cannot be negative",
  }),

  currentValue: z.coerce.number().min(0, {
    message: "Current value cannot be negative",
  }),

  costPrice: z.coerce.number().min(0, {
    message: "Cost price cannot be negative",
  }),
})


export function ProductUploadForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    // @ts-ignore
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      brand: "",
      category: undefined,
      description: "",
      quantity: 0,
      currentValue: 0,
      costPrice: 0,
    },
  })


  function onSubmit(data: z.infer<typeof formSchema>) {

    console.log("Product:", data)

    toast.success("Product submitted successfully")

  }


  return (
    <Card className="w-[1000px] ">

      <CardHeader>

        <CardTitle>
          Product Upload
        </CardTitle>

        <CardDescription>
          Add a new product to your inventory.
        </CardDescription>

      </CardHeader>


      <CardContent>

        <form

          id="product-upload-form"
          // @ts-ignore
          onSubmit={form.handleSubmit(onSubmit)}
        >

          <FieldGroup>

            <div className="grid gap-7 md:grid-cols-2">

              {/* NAME */}

              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (

                  <Field data-invalid={fieldState.invalid}>

                    <FieldLabel htmlFor="product-name">
                      Name
                    </FieldLabel>

                    <Input
                      {...field}
                      id="product-name"
                      placeholder="Product Name"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                      />
                    )}

                  </Field>

                )}
              />


              {/* BRAND */}

              <Controller
                name="brand"
                control={form.control}
                render={({ field, fieldState }) => (

                  <Field data-invalid={fieldState.invalid}>

                    <FieldLabel htmlFor="product-brand">
                      Brand
                    </FieldLabel>

                    <Input
                      {...field}
                      id="product-brand"
                      placeholder="Brand Name"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                      />
                    )}

                  </Field>

                )}
              />

            </div>


            {/* CATEGORY */}

            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (

                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel>
                    Category
                  </FieldLabel>

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >

                    <SelectTrigger
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>

                      <SelectItem value="GROCERIES">
                        Groceries
                      </SelectItem>

                      <SelectItem value="HOME_APPLIANCE">
                        Home Appliance
                      </SelectItem>

                      <SelectItem value="LAPTOPS">
                        Laptops
                      </SelectItem>

                    </SelectContent>

                  </Select>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}

                </Field>

              )}
            />


            {/* DESCRIPTION */}

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (

                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel htmlFor="product-description">
                    Description
                  </FieldLabel>

                  <Textarea
                    {...field}
                    id="product-description"
                    placeholder="Describe the product..."
                    rows={4}
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}

                </Field>

              )}
            />


            {/* QUANTITY */}

            <Controller
              name="quantity"
              control={form.control}
              render={({ field, fieldState }) => (

                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel htmlFor="product-quantity">
                    Quantity
                  </FieldLabel>

                  <Input
                    {...field}
                    id="product-quantity"
                    type="number"
                    min="0"
                    placeholder="0"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}

                </Field>

              )}
            />


            {/* CURRENT VALUE */}

            <Controller
              name="currentValue"
              control={form.control}
              render={({ field, fieldState }) => (

                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel htmlFor="product-current-value">
                    Current Value
                  </FieldLabel>

                  <Input
                    {...field}
                    id="product-current-value"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}

                </Field>

              )}
            />


            {/* COST PRICE */}

            <Controller
              name="costPrice"
              control={form.control}
              render={({ field, fieldState }) => (

                <Field data-invalid={fieldState.invalid}>

                  <FieldLabel htmlFor="product-cost-price">
                    Cost Price
                  </FieldLabel>

                  <Input
                    {...field}
                    id="product-cost-price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                    />
                  )}

                </Field>

              )}
            />

          </FieldGroup>

        </form>

      </CardContent>


      <CardFooter>

        <Field orientation="horizontal">

          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>

          <Button
            type="submit"
            form="product-upload-form"
          >
            Submit
          </Button>

        </Field>

      </CardFooter>

    </Card>
  )
}