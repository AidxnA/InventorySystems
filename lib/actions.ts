"use server"

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

export async function getProducts(): Promise<SerializedProduct[]> {
  try {
    const products = await prisma.product.findMany(
      {orderBy: {
    createdAt: 'desc',
  }});

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