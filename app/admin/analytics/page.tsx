'use client';

import { AdminLayout } from '@/components/AdminLayout';
import { Card } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', sales: 4000, orders: 24, customers: 12 },
  { month: 'Feb', sales: 3000, orders: 20, customers: 10 },
  { month: 'Mar', sales: 2000, orders: 19, customers: 15 },
  { month: 'Apr', sales: 2780, orders: 28, customers: 18 },
  { month: 'May', sales: 1890, orders: 22, customers: 14 },
  { month: 'Jun', sales: 2390, orders: 30, customers: 20 },
];

const categoryData = [
  { name: 'Men', value: 2400, color: '#3b82f6' },
  { name: 'Women', value: 2800, color: '#ec4899' },
  { name: 'Accessories', value: 1900, color: '#f59e0b' },
  { name: 'Sale', value: 1300, color: '#10b981' },
];

function AnalyticsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Analytics</h2>
        <p className="text-muted-foreground mt-1">Track your store performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">$18,060</p>
              <p className="text-xs text-green-600 mt-1">+12% from last month</p>
            </div>
            <DollarSign className="h-10 w-10 text-green-600/20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-3xl font-bold mt-2">143</p>
              <p className="text-xs text-green-600 mt-1">+8% from last month</p>
            </div>
            <ShoppingCart className="h-10 w-10 text-blue-600/20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New Customers</p>
              <p className="text-3xl font-bold mt-2">89</p>
              <p className="text-xs text-green-600 mt-1">+5% from last month</p>
            </div>
            <Users className="h-10 w-10 text-pink-600/20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              <p className="text-3xl font-bold mt-2">$126.29</p>
              <p className="text-xs text-green-600 mt-1">+3% from last month</p>
            </div>
            <TrendingUp className="h-10 w-10 text-yellow-600/20" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="font-semibold mb-4">Sales & Orders Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="orders" stroke="#ec4899" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Customer Growth Chart */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Customer Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="customers" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Products */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Top Performing Products</h3>
        <div className="space-y-3">
          {[
            { name: 'Premium Cotton T-Shirt', sales: 245, revenue: '$2,940' },
            { name: 'Classic Denim Jeans', sales: 189, revenue: '$3,402' },
            { name: 'Summer Dress', sales: 156, revenue: '$2,340' },
            { name: 'Designer Jacket', sales: 92, revenue: '$2,760' },
            { name: 'Leather Shoes', sales: 78, revenue: '$1,560' },
          ].map((product, index) => (
            <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0">
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.sales} sales</p>
              </div>
              <p className="font-semibold">{product.revenue}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout>
      <AnalyticsContent />
    </AdminLayout>
  );
}
