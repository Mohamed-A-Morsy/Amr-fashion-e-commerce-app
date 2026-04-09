'use client';

import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

const customers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567', city: 'New York', orders: 5, totalSpent: 1249.95, joinDate: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 (555) 234-5678', city: 'Los Angeles', orders: 8, totalSpent: 2149.99, joinDate: '2023-12-10' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 (555) 345-6789', city: 'Chicago', orders: 3, totalSpent: 749.97, joinDate: '2024-02-20' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+1 (555) 456-7890', city: 'Houston', orders: 12, totalSpent: 3899.88, joinDate: '2023-11-05' },
  { id: '5', name: 'Tom Brown', email: 'tom@example.com', phone: '+1 (555) 567-8901', city: 'Phoenix', orders: 2, totalSpent: 499.98, joinDate: '2024-03-01' },
];

function CustomersContent() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Customers</h2>
        <p className="text-muted-foreground mt-1">Manage and view all your customers</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search customers by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Customers</p>
          <p className="text-3xl font-bold mt-2">{customers.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-3xl font-bold mt-2">{customers.reduce((sum, c) => sum + c.orders, 0)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-3xl font-bold mt-2">${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}</p>
        </Card>
      </div>

      {/* Customers Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Contact</th>
                <th className="px-4 py-3 text-left font-semibold">Location</th>
                <th className="px-4 py-3 text-left font-semibold">Orders</th>
                <th className="px-4 py-3 text-left font-semibold">Total Spent</th>
                <th className="px-4 py-3 text-left font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium">{customer.name}</td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {customer.city}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{customer.orders}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">${customer.totalSpent.toFixed(2)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{customer.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No customers found</p>
        </div>
      )}
    </div>
  );
}

export default function AdminCustomersPage() {
  return (
    <AdminLayout>
      <CustomersContent />
    </AdminLayout>
  );
}
