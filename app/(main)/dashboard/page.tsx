import React from 'react'
import Greeting from '@/components/Greeting'
import { currentUser } from '@clerk/nextjs/server'
import { AlertTriangle, Boxes, CircleDollarSign, TrendingUp } from 'lucide-react'
import { getDashboardMetrics } from '../../../lib/dashboard'

type Props = {
  searchParams: Promise<{ from?: string; to?: string }>
}

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const page = async ({ searchParams }: Props) => {
  const user = await currentUser()
  const params = await searchParams
  const from = params.from ? new Date(`${params.from}T00:00:00`) : undefined
  const to = params.to ? new Date(`${params.to}T23:59:59.999`) : undefined
  const metrics = await getDashboardMetrics({
    from: from && !Number.isNaN(from.getTime()) ? from : undefined,
    to: to && !Number.isNaN(to.getTime()) ? to : undefined,
  })

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Greeting username={user?.firstName} />

        <form className="flex flex-wrap items-end gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            From
            <input name="from" type="date" defaultValue={params.from} className="h-9 rounded-md border border-slate-300 px-3" />
          </label>
          <label className="grid gap-1 text-sm font-medium text-slate-700">
            To
            <input name="to" type="date" defaultValue={params.to} className="h-9 rounded-md border border-slate-300 px-3" />
          </label>
          <button type="submit" className="h-9 rounded-md bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-700">Update</button>
        </form>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Dashboard metrics">
          <MetricCard label="Revenue in period" value={currency.format(metrics.revenue)} icon={<CircleDollarSign />} />
          <MetricCard label="Product value" value={currency.format(metrics.productValue)} icon={<Boxes />} />
          <MetricCard label="Monthly profit" value={currency.format(metrics.monthlyProfit)} icon={<TrendingUp />} />
          <MetricCard label="Low stock items" value={String(metrics.lowStockProducts.length)} icon={<AlertTriangle />} warning={metrics.lowStockProducts.length > 0} />
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-900">Low stock notifier</h2>
            <span className="text-sm text-slate-500">5 units or fewer</span>
          </div>
          {metrics.lowStockProducts.length === 0 ? (
            <p className="text-sm text-slate-500">All products are sufficiently stocked.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {metrics.lowStockProducts.map((product) => (
                <li key={product.id} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-medium text-slate-800">{product.name}</span>
                  <span className="font-semibold text-amber-600">{product.quantity} left</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

function MetricCard({ label, value, icon, warning = false }: { label: string; value: string; icon: React.ReactNode; warning?: boolean }) {
  return (
    <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className={`mb-4 flex size-10 items-center justify-center rounded-lg ${warning ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
        {icon}
      </div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
    </article>
  )
}

export default page