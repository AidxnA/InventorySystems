"use server"

import page from "@/app/sign-up/[[...sign-up]]/page";
import { prisma } from "./db";
import { Product } from "./generated/prisma/browser";

export async function uploadProduct(productData: Omit<Product, "id">) {
  try {
   const upload = await prisma.product.create({
      data: {
        name: productData.name,
        brand: productData.brand,
        category: productData.category,
        description: productData.description,
        quantity: productData.quantity,
        currentValue: productData.currentValue,
        costPrice: productData.costPrice,
      },
    });

    return upload;
  } catch (error) {
    console.error("Error uploading product:", error);
    throw error;
  }
}


export type SerializedProduct = Omit<Product, "currentValue" | "costPrice"> & {
  currentValue: number;
  costPrice: number;
};

export async function getProducts(page_number:number): Promise<SerializedProduct[]> {
  const pagesize = 10;
  const skip  = ( page_number-1 )* pagesize 
    try {
    const products = await prisma.product.findMany(
      {orderBy: {
    createdAt: 'desc',
  },
  take:pagesize,
  skip: skip 

});

    return products.map((p) => ({
      ...p,
      currentValue: p.currentValue.toNumber(),
      costPrice: p.costPrice.toNumber(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}