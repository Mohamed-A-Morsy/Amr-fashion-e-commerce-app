'use client';

import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { products } from '@/lib/data/products';
import { useState } from 'react';
import { toast } from 'sonner';

function ProductsContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [productList, setProductList] = useState(products);

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProductList(productList.filter((p) => p.id !== id));
      toast.success('Product deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Products</h2>
          <p className="text-muted-foreground mt-1">Manage your product inventory and details</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>
          {/* Controls */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Link href="/admin/products/new">
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute right-2 top-2 flex gap-2">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button variant="secondary" size="icon" className="h-8 w-8">
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="font-bold">${product.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Stock</p>
                      <p className={`font-bold ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {product.stock}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p className="font-bold">{product.rating}⭐</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      SKU: {product.id} | Category: {product.category}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <Card className="flex h-48 items-center justify-center">
              <div className="text-center">
                <p className="font-semibold">No products found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search</p>
              </div>
            </Card>
          )}

          {/* Summary */}
          <Card className="p-6 bg-muted/30">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="mt-1 text-2xl font-bold">{productList.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="mt-1 text-2xl font-bold text-yellow-600">
                  {productList.filter((p) => p.stock <= 10 && p.stock > 0).length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="mt-1 text-2xl font-bold text-red-600">
                  {productList.filter((p) => p.stock === 0).length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="mt-1 text-2xl font-bold">
                  {(productList.reduce((sum, p) => sum + p.rating, 0) / productList.length).toFixed(1)}⭐
                </p>
              </div>
            </div>
          </Card>
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <ProductsContent />
    </AdminLayout>
  );
}
