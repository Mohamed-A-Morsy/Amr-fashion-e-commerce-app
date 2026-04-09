'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useParams } from 'next/navigation';
import { products } from '@/lib/data/products';
import { Star, Heart, Share2, Truck, RotateCcw, Check } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0].id || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mainImage, setMainImage] = useState(product?.images[0] || '');

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold">Product not found</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const selectedColorObj = product.colors.find((c) => c.id === selectedColor);
  const displayImage = selectedColorObj?.images[0] || mainImage;
  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success(t('message.added_to_cart'));
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted ? t('message.removed_from_wishlist') : t('message.added_to_wishlist')
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30 py-4">
          <div className="mx-auto max-w-7xl px-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              {t('nav.home')}
            </Link>
            {' / '}
            <Link href="/shop" className="hover:text-foreground">
              {t('nav.shop')}
            </Link>
            {' / '}
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Product Images */}
            <div>
              <div className="relative mb-4 overflow-hidden rounded-lg bg-muted">
                <img
                  src={displayImage}
                  alt={product.name}
                  className="h-96 w-full object-cover md:h-full"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {selectedColorObj?.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className="rounded-lg border-2 border-transparent overflow-hidden hover:border-primary"
                  >
                    <img src={img} alt={`${product.name} ${idx}`} className="h-20 w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleWishlist}
                    className={isWishlisted ? 'text-red-500' : ''}
                  >
                    <Heart className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} />
                  </Button>
                </div>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-3xl font-bold">${discountedPrice}</span>
                  {product.discount && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                        Save {product.discount}%
                      </span>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mt-4">
                  {product.stock > 0 ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="h-4 w-4" />
                      <span className="text-sm font-semibold">In Stock</span>
                    </div>
                  ) : (
                    <div className="text-sm font-semibold text-red-600">Out of Stock</div>
                  )}
                </div>

                {/* Description */}
                <p className="mt-6 text-muted-foreground">{product.fullDescription}</p>
              </div>

              {/* Selections */}
              <div className="space-y-6 border-y py-6">
                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-semibold">{t('product.select_color')}</label>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`rounded-lg border-2 p-3 transition-all ${
                          selectedColor === color.id
                            ? 'border-primary'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="h-6 w-6 rounded-full border"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-sm font-medium">{color.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-semibold">{t('product.select_size')}</label>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded border py-2 text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold">{t('product.quantity')}</label>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded border border-border px-3 py-2 hover:bg-muted"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded border border-border px-3 py-2 hover:bg-muted"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {t('button.add_to_cart')}
                </Button>
                <Link href="/checkout" className="block">
                  <Button size="lg" variant="outline" className="w-full">
                    {t('button.buy_now')}
                  </Button>
                </Link>
              </div>

              {/* Share */}
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  {t('product.share')}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 space-y-3 rounded-lg bg-muted/30 p-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over $100</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mt-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">{t('product.description')}</TabsTrigger>
              <TabsTrigger value="size-guide">{t('product.size_guide')}</TabsTrigger>
              <TabsTrigger value="shipping">{t('product.shipping_info')}</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose prose-sm max-w-none">
                <p>{product.fullDescription}</p>
              </div>
            </TabsContent>

            <TabsContent value="size-guide" className="mt-6">
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Size</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Chest (in)</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes.map((size) => (
                      <tr key={size} className="border-t">
                        <td className="px-4 py-2 text-sm">{size}</td>
                        <td className="px-4 py-2 text-sm">—</td>
                        <td className="px-4 py-2 text-sm">—</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="space-y-4">
                <p>We offer fast and reliable shipping worldwide.</p>
                <ul className="space-y-2 text-sm">
                  <li>• Standard Shipping: 5-7 business days</li>
                  <li>• Express Shipping: 2-3 business days</li>
                  <li>• Free shipping on orders over $100</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16 border-t pt-16">
              <h2 className="text-2xl font-bold">{t('product.related')}</h2>

              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.slice(0, 4).map((p) => (
                  <Link key={p.id} href={`/products/${p.id}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative overflow-hidden bg-muted">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="h-64 w-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold line-clamp-2">{p.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">${p.price.toFixed(2)}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
