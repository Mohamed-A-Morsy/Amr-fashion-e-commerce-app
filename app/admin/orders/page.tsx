'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/lib/context/LanguageContext';
import Link from 'next/link';
import { Menu, Search, Download, Filter } from 'lucide-react';
import { useState } from 'react';

const orders = [
  { id: '#ORD001', customer: 'John Doe', email: 'john@example.com', amount: 249.99, status: 'delivered', date: '2024-04-08', items: 3 },
  { id: '#ORD002', customer: 'Jane Smith', email: 'jane@example.com', amount: 159.99, status: 'shipped', date: '2024-04-07', items: 1 },
  { id: '#ORD003', customer: 'Mike Johnson', email: 'mike@example.com', amount: 399.98, status: 'processing', date: '2024-04-06', items: 2 },
  { id: '#ORD004', customer: 'Sarah Wilson', email: 'sarah@example.com', amount: 129.99, status: 'pending', date: '2024-04-05', items: 1 },
  { id: '#ORD005', customer: 'Tom Brown', email: 'tom@example.com', amount: 279.99, status: 'delivered', date: '2024-04-04', items: 2 },
];

export default function AdminOrdersPage() {
  const { t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} border-r bg-sidebar transition-all duration-300 flex flex-col`}>
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

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin">
            <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-sidebar-accent">
              <span className="text-sm">Dashboard</span>
            </div>
          </Link>
          <Link href="/admin/orders">
            <div className="flex items-center gap-3 rounded-lg bg-sidebar-primary/20 p-3 text-sidebar-primary">
              <span className="text-sm font-semibold">{t('admin.orders')}</span>
            </div>
          </Link>
          <Link href="/admin/products">
            <div className="flex items-center gap-3 rounded-lg p-3 hover:bg-sidebar-accent">
              <span className="text-sm">Products</span>
            </div>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="border-b bg-card p-6">
          <h1 className="text-3xl font-bold">{t('admin.orders')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage and track all customer orders.</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Controls */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {/* Orders Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/30">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Order ID</th>
                    <th className="px-6 py-3 text-left font-semibold">Customer</th>
                    <th className="px-6 py-3 text-left font-semibold">Email</th>
                    <th className="px-6 py-3 text-left font-semibold">Date</th>
                    <th className="px-6 py-3 text-left font-semibold">Items</th>
                    <th className="px-6 py-3 text-left font-semibold">Amount</th>
                    <th className="px-6 py-3 text-left font-semibold">Status</th>
                    <th className="px-6 py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/20 transition">
                      <td className="px-6 py-4 font-medium">{order.id}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4 text-muted-foreground">{order.email}</td>
                      <td className="px-6 py-4">{order.date}</td>
                      <td className="px-6 py-4">{order.items}</td>
                      <td className="px-6 py-4 font-semibold">${order.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/orders/${order.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="flex h-32 items-center justify-center">
                <p className="text-muted-foreground">No orders found</p>
              </div>
            )}
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
            <div className="space-x-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
