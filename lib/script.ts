'use server'

import { prisma } from "./db";
import { Category } from "./generated/prisma/enums";

async function main() {
  console.log("=== DATABASE TEST START ===\n");

  // -----------------------------
  // 1. Create Customer
  // -----------------------------
  const customer = await prisma.customer.create({
    data: {
      name: "John Doe",
      phone: "+233540000001",
      email: "john@example.com",
    },
  });

  console.log("✅ Customer Created");
  console.log(customer);

  // -----------------------------
  // 2. Create Products
  // -----------------------------
  const laptop = await prisma.product.create({
    data: {
      name: "MacBook Air M3",
      brand: "Apple",
      category: Category.LAPTOPS,
      description: "13-inch Apple Laptop",
      quantity: 20,
    },
  });

  const washingMachine = await prisma.product.create({
    data: {
      name: "Washing Machine",
      brand: "Samsung",
      category: Category.HOME_APPLIANCE,
      description: "10kg Smart Washer",
      quantity: 10,
    },
  });

  console.log("\n✅ Products Created");

  // -----------------------------
  // 3. Create Sale
  // -----------------------------
  const sale = await prisma.sale.create({
    data: {
      customerId: customer.id,
      discount: 100,
      subtotal: 2100,
    },
  });

  console.log("\n✅ Sale Created");

  // -----------------------------
  // 4. Create Sale Items
  // -----------------------------
  await prisma.saleItem.createMany({
    data: [
      {
        saleId: sale.id,
        productId: laptop.id,
        quantity: 1,
        unitPrice: 1800,
      },
      {
        saleId: sale.id,
        productId: washingMachine.id,
        quantity: 1,
        unitPrice: 300,
      },
    ],
  });

  console.log("✅ Sale Items Added");

  // -----------------------------
  // 5. Fetch Customer Purchases
  // -----------------------------
  const purchases = await prisma.customer.findUnique({
    where: {
      id: customer.id,
    },
    include: {
      sales: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  console.log("\n✅ Customer Purchase History");
  console.dir(purchases, { depth: null });

  // -----------------------------
  // 6. Update Inventory
  // -----------------------------
  await prisma.product.update({
    where: {
      id: laptop.id,
    },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  });

  await prisma.product.update({
    where: {
      id: washingMachine.id,
    },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  });

  console.log("\n✅ Inventory Updated");

  // -----------------------------
  // 7. Verify Inventory
  // -----------------------------
  const products = await prisma.product.findMany();

  console.log("\nCurrent Inventory");
  console.table(
    products.map((p) => ({
      Name: p.name,
      Quantity: p.quantity,
    }))
  );

  // -----------------------------
  // 8. Test Unique Constraint
  // -----------------------------
  try {
    await prisma.customer.create({
      data: {
        name: "Duplicate User",
        phone: "+233540000001",
        email: "john@example.com",
      },
    });
  } catch {
    console.log("\n✅ Unique Constraint Working");
  }

  // -----------------------------
  // 9. Delete Sale
  // -----------------------------
  await prisma.sale.delete({
    where: {
      id: sale.id,
    },
  });

  console.log("\n✅ Sale Deleted");

  // -----------------------------
  // 10. Verify Cascade Delete
  // -----------------------------
  const saleItems = await prisma.saleItem.findMany();

  console.log(
    `Sale Items Remaining After Delete: ${saleItems.length}`
  );

  console.log("\n=== DATABASE TEST COMPLETE ===");
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });