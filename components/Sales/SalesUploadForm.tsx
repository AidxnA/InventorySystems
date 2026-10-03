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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import { Product } from "@/lib/generated/prisma/client"
import { testByName } from "@/lib/actions"

const formSchema = z.object({
 discount: z.number().min(0, {message: "Discount has to be at least 0%"}),
 item: z.array(z.string()),
 customerid: z.string()
 
})

export function SalesUploadForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      discount: 0,
      item:[],
      customerid: "",

    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data.customerid)
  } 
     const [query, setQuery] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  // Debounced database search when typing
  React.useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await testByName(query);
        setProducts(results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timer);
  }, [query]);
  

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sales Upload</CardTitle>
        <CardDescription>
          Upload sales data for processing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="item"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Bug Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          <Controller
      name="item"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="relative">
          <FieldLabel htmlFor="form-rhf-demo-title">
            Product Item
          </FieldLabel>

          <div className="relative">
            <Input
              {...field}
              id="form-rhf-demo-title"
              aria-invalid={fieldState.invalid}
              placeholder="Type to search products..."
              autoComplete="off"
              value={query || field.value || ""}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                field.onChange(val); // Update form value
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onBlur={() => {
                // Short delay to allow clicking a dropdown option
                setTimeout(() => setIsOpen(false), 200);
              }}
            />

            {isLoading && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                Loading...
              </span>
            )}
          </div>

          {/* Dropdown Options List */}
          {isOpen && products.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md text-popover-foreground">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="cursor-pointer rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  onMouseDown={() => {
                    // Use onMouseDown so it fires before onBlur
                    field.onChange(product.name); // Store product name or product.id
                    setQuery(product.name);
                    setIsOpen(false);
                  }}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}

          {isOpen && query && !isLoading && products.length === 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover p-3 text-xs text-muted-foreground shadow-md">
              No products found.
            </div>
          )}

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
