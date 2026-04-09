'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/lib/context/LanguageContext';
import Link from 'next/link';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, ShoppingCart, Users, TrendingUp, AlertCircle, Settings, Menu } from 'lucide-react';
import { useState } from 'react';

const salesData = [
  { month: 'Jan', sales: 4000, orders: 24 },
  { month: 'Feb', sales: 3000, orders: 20 },
  { month: 'Mar', sales: 2000, orders: 19 },
  { month: 'Apr', sales: 2780, orders: 28 },
  { month: 'May', sales: 1890, orders: 22 },
  { month: 'Jun', sales: 2390, orders: 30 },
];

const orderStatusData = [
  { name: 'Delivered', value: 145 },
  { name: 'Shipped', value: 32 },
  { name: 'Processing', value: 18 },
  { name: 'Pending', value: 5 },
];

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

const recentOrders = [
  { id: '#ORD001', customer: 'John Doe', amount: 249.99, status: 'delivered', date: '2024-04-08' },
  { id: '#ORD002', customer: 'Jane Smith', amount: 159.99, status: 'shipped', date: '2024-04-07' },
  { id: '#ORD003', customer: 'Mike Johnson', amount: 399.98, status: 'processing', date: '2024-04-06' },
  { id: '#ORD004', customer: 'Sarah Wilson', amount: 129.99, status: 'pending', date: '2024-04-05' },
  { id: '#ORD005', customer: 'Tom Brown', amount: 279.99, status: 'delivered', date: '2024-04-04' },
];

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} border-r bg-sidebar transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="border-b p-4 flex items-center justify-between">
          {isSidebarOpen && <h1 className="text-lg font-bold">Admin</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin">
            <div className="flex items-center gap-3 rounded-lg bg-sidebar-primary/20 p-3 text-sidebar-primary">
              <TrendingUp className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm font-semibold">Dashboard</span>}
            </div>
          </Link>

          <Link href="/admin/orders">
            <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-sidebar-accent">
              <ShoppingCart className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm">{t('admin.orders')}</span>}
            </div>
          </Link>

          <Link href="/admin/products">
            <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-sidebar-accent">
              <Package className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm">{t('admin.products')}</span>}
            </div>
          </Link>

          <Link href="/admin/customers">
            <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-sidebar-accent">
              <Users className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm">{t('admin.customers')}</span>}
            </div>
          </Link>

          <Link href="/admin/analytics">
            <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-sidebar-accent">
              <BarChart className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm">{t('admin.analytics')}</span>}
            </div>
          </Link>

          <Link href="/admin/settings">
            <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-sidebar-accent">
              <Settings className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm">{t('admin.settings')}</span>}
            </div>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="border-b bg-card p-6">
          <h1 className="text-3xl font-bold">{t('admin.dashboard')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back! Here&apos;s your store overview.</p>
        </div>

        <div className="p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('admin.total_orders')}</p>
                  <p className="mt-2 text-3xl font-bold">1,248</p>
                  <p className="mt-1 text-xs text-green-600">+12% from last month</p>
                </div>
                <ShoppingCart className="h-10 w-10 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('admin.total_sales')}</p>
                  <p className="mt-2 text-3xl font-bold">$45,231</p>
                  <p className="mt-1 text-xs text-green-600">+8% from last month</p>
                </div>
                <TrendingUp className="h-10 w-10 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('admin.total_customers')}</p>
                  <p className="mt-2 text-3xl font-bold">892</p>
                  <p className="mt-1 text-xs text-green-600">+5% from last month</p>
                </div>
                <Users className="h-10 w-10 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Order Value</p>
                  <p className="mt-2 text-3xl font-bold">$36.25</p>
                  <p className="mt-1 text-xs text-green-600">+3% from last month</p>
                </div>
                <Package className="h-10 w-10 text-primary opacity-20" />
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Sales Chart */}
            <Card className="lg:col-span-2 p-6">
              <h2 className="font-bold">Sales Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#000" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Order Status Chart */}
            <Card className="p-6">
              <h2 className="font-bold">Order Status</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Recent Orders</h2>
              <Link href="/admin/orders">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                    <th className="px-4 py-3 text-left font-semibold">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold">Date</th>
                    <th className="px-4 py-3 text-left font-semibold">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{order.id}</td>
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3">{order.date}</td>
                      <td className="px-4 py-3 font-semibold">${order.amount.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Low Stock Alert */}
          <Card className="border-yellow-200 bg-yellow-50 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-900">Low Stock Alert</h3>
                <p className="text-sm text-yellow-700">
                  5 products are running low on inventory. <Link href="/admin/products" className="underline">View products</Link>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
