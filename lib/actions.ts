"use server"
import { prisma } from "./db";
import { Product } from "./generated/prisma/browser";

export async function uploadProduct(productData: Omit<Product, "id">) {
  try {
    await prisma.product.create({
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

  } catch (error) {
    console.error("Error uploading product:", error);
    throw error;
  }
}
export async function getProducts() { 
    try { 
        const products = await prisma.product.findMany();
        return products; 
}
    catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }}