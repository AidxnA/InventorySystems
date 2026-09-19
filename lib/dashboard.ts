import { prisma } from "@/lib/db";

export const LOW_STOCK_THRESHOLD = 5;

type DashboardPeriod = {
  from?: Date;
  to?: Date;
};

export async function getDashboardMetrics(period: DashboardPeriod = {}) {
  const now = new Date();
  const from = period.from ?? new Date(now.getFullYear(), now.getMonth(), 1);
  const to = period.to ?? now;
  const monthlyFrom = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyTo = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [periodSales, monthlySales, products, lowStockProducts] = await Promise.all([
    prisma.sale.findMany({
      where: { createdAt: { gte: from, lte: to } },
      select: { subtotal: true, discount: true },
    }),
    prisma.sale.findMany({
      where: { createdAt: { gte: monthlyFrom, lt: monthlyTo } },
      select: {
        subtotal: true,
        discount: true,
        items: { select: { quantity: true, product: { select: { costPrice: true } } } },
      },
    }),
    prisma.product.findMany({
      select: { id: true, name: true, quantity: true, currentValue: true },
    }),
    prisma.product.findMany({
      where: { quantity: { lte: LOW_STOCK_THRESHOLD } },
      select: { id: true, name: true, quantity: true },
      orderBy: { quantity: "asc" },
    }),
  ]);

  const revenue = periodSales.reduce(
    (total, sale) => total + Number(sale.subtotal) - Number(sale.discount),
    0,
  );
  const monthlyProfit = monthlySales.reduce((total, sale) => {
    const saleRevenue = Number(sale.subtotal) - Number(sale.discount);
    const cost = sale.items.reduce(
      (itemTotal, item) => itemTotal + item.quantity * Number(item.product.costPrice),
      0,
    );
    return total + saleRevenue - cost;
  }, 0);
  const productValue = products.reduce(
    (total, product) => total + product.quantity * Number(product.currentValue),
    0,
  );

  return { revenue, productValue, monthlyProfit, lowStockProducts };
}
