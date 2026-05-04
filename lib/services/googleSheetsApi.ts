import { CreateOrderPayload, Order, Product, ProductColor } from '@/types';

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

if (!SCRIPT_URL) {
  console.warn('NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL is not set.');
}

function normalizeText(value: unknown): string {
  return String(value || '').trim();
}

function toBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') return value;

  const normalized = String(value || '').trim().toLowerCase();

  return (
    normalized === 'true' ||
    normalized === 'yes' ||
    normalized === '1' ||
    normalized === 'TRUE'.toLowerCase()
  );
}

function toNumber(value: unknown): number {
  const num = Number(String(value || '').trim());
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

      const name = normalizeText(namePart);
      const hex = normalizeText(hexPart) || '#000000';

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
    id: normalizeText(row.id),
    name: normalizeText(row.name),
    description: normalizeText(row.description),
    fullDescription: normalizeText(row.fullDescription || row.description),
    price: toNumber(row.price),
    discount: toNumber(row.discount),
    category: normalizeText(row.category),
    images,
    colors: parseColors(row.colors, images),
    sizes: parseArray(row.sizes),
    stock: toNumber(row.stock),
    rating: toNumber(row.rating),
    reviews: toNumber(row.reviews),
    isFeatured: toBoolean(row.isFeatured),
    isNew: toBoolean(row.isNew),
    isBestSeller: toBoolean(row.isBestSeller),
    status: normalizeText(row.status || 'active').toLowerCase(),
  };
}

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    cache: 'no-store',
    next: { revalidate: 0 },
  });

  const text = await response.text();

  let data: any;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Invalid response from Google Sheet');
  }

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export async function getProducts(): Promise<Product[]> {
  if (!SCRIPT_URL) {
    throw new Error('Google Apps Script URL is missing');
  }

  const data = await fetchJson<{
    success: boolean;
    products: Record<string, unknown>[];
  }>(`${SCRIPT_URL}?action=getProducts&t=${Date.now()}`, {
    method: 'GET',
  });

  return (data.products || [])
    .map(mapSheetProduct)
    .filter((item) => item.status === 'active');
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
    `${SCRIPT_URL}?action=getCustomerOrders&email=${encodeURIComponent(email)}&t=${Date.now()}`,
    {
      method: 'GET',
    }
  );

  return data.orders || [];
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  if (!SCRIPT_URL) {
    throw new Error('Google Apps Script URL is missing');
  }

  const data = await fetchJson<{ success: boolean; order: Order | null }>(
    `${SCRIPT_URL}?action=getOrderById&order_id=${encodeURIComponent(orderId)}&t=${Date.now()}`,
    {
      method: 'GET',
    }
  );

  return data.order || null;
}