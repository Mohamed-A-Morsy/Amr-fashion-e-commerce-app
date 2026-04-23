'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '@/lib/services/googleSheetsApi';
import { Product } from '@/types';
import { useCart } from '@/lib/context/CartContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Star, ShoppingCart, Check } from 'lucide-react';

function getFinalPrice(product: Product) {
  const price = Number(product.price || 0);
  const discount = Number(product.discount || 0);

  if (!discount) return price;

  return Math.max(price - (price * discount) / 100, 0);
}

function getSafeImages(product: Product | null) {
  if (!product?.images?.length) return ['/images/black-shirt-1.png'];

  const cleaned = product.images
    .map((img) => String(img || '').trim())
    .filter(Boolean);

  return cleaned.length ? cleaned : ['/images/black-shirt-1.png'];
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { t, isRTL } = useLanguage();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('/images/black-shirt-1.png');
  const [imageErrorCount, setImageErrorCount] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError('');

        if (!id) {
          setError('Product not found');
          return;
        }

        const result = await getProductById(String(id));

        if (!result) {
          setError('Product not found');
          return;
        }

        setProduct(result);

        if (result.sizes?.length) {
          setSelectedSize(result.sizes[0]);
        }

        if (result.colors?.length) {
          setSelectedColor(result.colors[0].name);
        }

        const initialImages = getSafeImages(result);
        setMainImage(initialImages[0]);
        setImageErrorCount(0);
      } catch (err) {
        console.error(err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const safeImages = useMemo(() => getSafeImages(product), [product]);

  const displayName = useMemo(() => {
    if (!product) return '';
    return product.name;
  }, [product]);

  const displayDescription = useMemo(() => {
    if (!product) return '';
    return product.fullDescription || product.description || '';
  }, [product]);

  const finalPrice = product ? getFinalPrice(product) : 0;

  const handleImageError = () => {
    if (imageErrorCount < safeImages.length - 1) {
      const nextImage = safeImages[imageErrorCount + 1];
      setMainImage(nextImage);
      setImageErrorCount((prev) => prev + 1);
      return;
    }

    setMainImage('/images/black-shirt-1.png');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center">
            <p className="text-lg font-semibold">
              {isRTL ? 'جاري تحميل المنتج...' : 'Loading product...'}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center">
            <p className="text-lg font-semibold text-red-500">
              {isRTL ? 'المنتج غير موجود' : error || 'Product not found'}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="border-b bg-muted/30 py-4">
          <div className="mx-auto max-w-7xl px-4 text-sm text-muted-foreground">
            {isRTL ? (
              <div className="text-right">
                <span>{displayName}</span>
                <span>{' / '}</span>
                <span>{t('nav.shop') || 'Shop'}</span>
                <span>{' / '}</span>
                <span>{t('nav.home') || 'Home'}</span>
              </div>
            ) : (
              <div>
                <span>{t('nav.home') || 'Home'}</span>
                <span>{' / '}</span>
                <span>{t('nav.shop') || 'Shop'}</span>
                <span>{' / '}</span>
                <span className="text-foreground">{displayName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border bg-gray-100 p-6">
              <img
                key={mainImage}
                src={mainImage}
                alt={displayName}
                onError={handleImageError}
                className="h-full w-full object-contain"
              />
            </div>

            {safeImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {safeImages.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setMainImage(img)}
                    className={`overflow-hidden rounded-xl border p-2 transition ${
                      mainImage === img
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${displayName} ${index + 1}`}
                      className="h-20 w-20 object-contain bg-gray-100"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h1 className="text-3xl font-bold md:text-4xl">{displayName}</h1>

            <div className={`mt-3 flex items-center gap-2 ${isRTL ? 'justify-end' : ''}`}>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{Number(product.rating || 0)}</span>
              <span className="text-sm text-muted-foreground">
                ({Number(product.reviews || 0)} {t('product.reviews') || 'reviews'})
              </span>
            </div>

            <div className={`mt-6 flex items-end gap-3 ${isRTL ? 'justify-end' : ''}`}>
              <span className="text-3xl font-bold">EGP {finalPrice.toFixed(2)}</span>

              {!!product.discount && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    EGP {Number(product.price).toFixed(2)}
                  </span>
                  <span className="rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>

            <div className={`mt-4 flex items-center gap-2 text-sm font-semibold ${
              product.stock > 0 ? 'text-green-600' : 'text-red-600'
            } ${isRTL ? 'justify-end' : ''}`}>
              {product.stock > 0 ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>
                    {isRTL
                      ? `متوفر (${product.stock} قطعة)`
                      : `In Stock (${product.stock} available)`}
                  </span>
                </>
              ) : (
                <span>{isRTL ? 'غير متوفر' : 'Out of Stock'}</span>
              )}
            </div>

            <p className="mt-6 leading-8 text-muted-foreground">{displayDescription}</p>

            <div className="mt-8">
              <h3 className="mb-3 font-semibold">
                {t('product.select_color') || (isRTL ? 'اختر اللون' : 'Select Color')}
              </h3>

              <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                {product.colors?.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    className={`rounded-lg border px-4 py-2 transition ${
                      selectedColor === color.name
                        ? 'border-black bg-black text-white'
                        : 'border-border bg-white text-black'
                    }`}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-3 font-semibold">
                {t('product.select_size') || (isRTL ? 'اختر المقاس' : 'Select Size')}
              </h3>

              <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-lg border px-4 py-2 transition ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-border bg-white text-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-3 font-semibold">
                {isRTL ? 'الكمية' : 'Quantity'}
              </h3>

              <div className={`flex ${isRTL ? 'justify-end' : ''}`}>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  max={Math.max(1, Number(product.stock || 1))}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  className="w-24 rounded-lg border p-2"
                />
              </div>
            </div>

            <div className="mt-10">
              <Button
                className="w-full"
                disabled={product.stock <= 0}
                onClick={() => {
                  if (!selectedSize || !selectedColor) {
                    alert(
                      isRTL
                        ? 'من فضلك اختار المقاس واللون'
                        : 'Please select size and color'
                    );
                    return;
                  }

                  addToCart(product, selectedSize, selectedColor, quantity);
                  alert(
                    isRTL
                      ? 'تمت إضافة المنتج إلى السلة'
                      : 'Product added to cart'
                  );
                }}
              >
                <ShoppingCart className={isRTL ? 'ml-2 h-4 w-4' : 'mr-2 h-4 w-4'} />
                {t('button.add_to_cart') || (isRTL ? 'أضف إلى السلة' : 'Add to Cart')}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}