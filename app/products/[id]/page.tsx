'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/lib/context/CartContext';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useParams } from 'next/navigation';
import { products } from '@/lib/data/products';
import { Star, Heart, Share2, Truck, RotateCcw, Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0].id || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    setMainImageIndex(0);
  }, [selectedColor]);

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
  const colorImages = selectedColorObj?.images || [];
  const displayImage = colorImages[mainImageIndex] || product.images[0];
  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      toast.error(t('message.select_size') || 'Please select a size');
      return;
    }
    setSizeError(false);
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

        <div className="mx-auto max-w-7xl px-4 py-8 lg:py-12">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
            {/* Product Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-xl bg-muted aspect-square flex items-center justify-center group">
                <img
                  src={displayImage}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Thumbnail Gallery */}
              {colorImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {colorImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMainImageIndex(idx)}
                      className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                        mainImageIndex === idx
                          ? 'ring-2 ring-primary'
                          : 'ring-1 ring-border hover:ring-primary'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="h-20 w-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">{product.name}</h1>
                  </div>
                  <button
                    onClick={handleWishlist}
                    className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                      isWishlisted
                        ? 'bg-red-100 text-red-600'
                        : 'bg-muted hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    <Heart
                      className="h-6 w-6"
                      fill={isWishlisted ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} {t('product.reviews') || 'reviews'})
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold">${discountedPrice}</span>
                  {product.discount && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                        −{product.discount}%
                      </span>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                    <Check className="h-4 w-4" />
                    In Stock ({product.stock} available)
                  </div>
                ) : (
                  <div className="text-sm font-semibold text-red-600">Out of Stock</div>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{product.fullDescription}</p>

              {/* Color Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold">{t('product.select_color')}</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className="group relative"
                      title={color.name}
                    >
                      <div
                        className={`h-10 w-10 rounded-full border-2 transition-all ${
                          selectedColor === color.id
                            ? 'border-primary scale-110'
                            : 'border-border hover:border-foreground/30'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap text-xs font-medium bg-foreground text-background px-2 py-1 rounded">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">
                    {t('product.select_size')}
                  </label>
                  {sizeError && (
                    <span className="text-xs text-red-600 font-medium">Required</span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2'
                          : `border border-border hover:border-foreground/50 ${
                              sizeError
                                ? 'border-red-300 bg-red-50'
                                : 'bg-background'
                            }`
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold">{t('product.quantity')}</label>
                <div className="flex items-center border border-border rounded-lg p-1 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-muted rounded transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-semibold min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-muted rounded transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {t('button.add_to_cart')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  {t('product.share')}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 border-t pt-6">
                <div className="flex gap-3">
                  <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over $100</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <RotateCcw className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mt-16 border-t pt-12">
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
