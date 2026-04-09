'use client';

import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { id: '1', name: 'Men', description: 'Men\'s clothing and accessories', itemCount: 45, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=300&fit=crop' },
  { id: '2', name: 'Women', description: 'Women\'s clothing and accessories', itemCount: 52, image: 'https://images.unsplash.com/photo-1508522537686-d4c3e4fe63f9?w=400&h=300&fit=crop' },
  { id: '3', name: 'Accessories', description: 'Bags, shoes, and more', itemCount: 38, image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop' },
  { id: '4', name: 'Sale', description: 'Discounted items', itemCount: 24, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
];

function CategoriesContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Categories</h2>
          <p className="text-muted-foreground mt-1">Manage your product categories</p>
        </div>
        <Button onClick={() => setIsAddingCategory(!isAddingCategory)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative h-40 overflow-hidden bg-muted">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop';
                }}
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <span className="text-sm font-medium">{category.itemCount} items</span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-muted rounded transition-colors">
                    <Edit2 className="h-4 w-4 text-blue-600" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded transition-colors">
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No categories found</p>
        </div>
      )}
    </div>
  );
}

export default function AdminCategoriesPage() {
  return (
    <AdminLayout>
      <CategoriesContent />
    </AdminLayout>
  );
}
