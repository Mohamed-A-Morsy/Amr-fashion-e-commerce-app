import { CreateOrderPayload, Order, Product, ProductColor } from '@/types';

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

if (!SCRIPT_URL) {
  console.warn('NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL is not set.');
}

function toBoolean(value: unknown): boolean {
  return String(value).toLowerCase() === 'true';
}

function toNumber(value: unknown): number {
  const num = Number(value);
  return Number.isNaN(num) ? 0 : num;
}

function parseArray(value: unknown): string[] {
  if (!value) return [];
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseColors(value: unknown, fallbackImages: string[]): ProductColor[] {
  if (!value) return [];

  return String(value)
    .split('|')
    .map((entry, index) => {
      const [namePart, hexPart] = entry.split(':');
      const name = (namePart || '').trim();
      const hex = (hexPart || '#000000').trim();

      if (!name) return null;

      return {
        id: `${name}-${index}`,
        name,
        hex,
        images: fallbackImages,
      };
    })
    .filter(Boolean) as ProductColor[];
}

function mapSheetProduct(row: Record<string, unknown>): Product {
  const images = parseArray(row.images);

  return {
    id: String(row.id || ''),
    name: String(row.name || ''),
    description: String(row.description || ''),
    fullDescription: String(row.fullDescription || row.description || ''),
    price: toNumber(row.price),
    discount: toNumber(row.discount),
    category: String(row.category || ''),
    images,
    colors: parseColors(row.colors, images),
    sizes: parseArray(row.sizes),
    stock: toNumber(row.stock),
    rating: toNumber(row.rating),
    reviews: toNumber(row.reviews),
    isFeatured: toBoolean(row.isFeatured),
    isNew: toBoolean(row.isNew),
    isBestSeller: toBoolean(row.isBestSeller),
    status: String(row.status || 'active'),
  };
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export async function getProducts(): Promise<Product[]> {
  if (!SCRIPT_URL) {
    throw new Error('Google Apps Script URL is missing');
  }

  const data = await fetchJson<{ success: boolean; products: Record<string, unknown>[] }>(
    `${SCRIPT_URL}?action=getProducts`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );
  
  
  return (data.products || []).map(mapSheetProduct).filter((item) => item.status === 'active');
}

export async function getProductById(productId: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.id === productId) || null;
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  if (!SCRIPT_URL) {
    throw new Error('Google Apps Script URL is missing');
  }

  const response = await fetchJson<{ success: boolean; order: Order }>(SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      action: 'createOrder',
      ...payload,
    }),
  });

  return response.order;
}

export async function getCustomerOrders(email: string): Promise<Order[]> {
  if (!SCRIPT_URL) {
    throw new Error('Google Apps Script URL is missing');
  }

  const data = await fetchJson<{ success: boolean; orders: Order[] }>(
    `${SCRIPT_URL}?action=getCustomerOrders&email=${encodeURIComponent(email)}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );

  return data.orders || [];
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  if (!SCRIPT_URL) {
    throw new Error('Google Apps Script URL is missing');
  }

  const data = await fetchJson<{ success: boolean; order: Order | null }>(
    `${SCRIPT_URL}?action=getOrderById&order_id=${encodeURIComponent(orderId)}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  );

  return data.order || null;
}