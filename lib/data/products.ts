import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Black Blazer',
    description: 'Elegant black blazer for every occasion',
    fullDescription: 'A timeless classic black blazer crafted from premium wool blend fabric. Perfect for both professional settings and casual outings. Features tailored fit, functional buttons, and deep pockets. Comfortable and durable for everyday wear.',
    price: 189,
    discount: 10,
    category: 'jackets',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552252917-24f1c2a91967?w=400&h=600&fit=crop',
    ],
    colors: [
      {
        id: 'c1-black',
        name: 'Black',
        hex: '#000000',
        images: [
          'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop',
        ],
      },
      {
        id: 'c1-navy',
        name: 'Navy',
        hex: '#001f3f',
        images: [
          'https://images.unsplash.com/photo-1552252917-24f1c2a91967?w=400&h=600&fit=crop',
        ],
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 45,
    rating: 4.8,
    reviews: 128,
    isFeatured: true,
    isNew: false,
  },
  {
    id: '2',
    name: 'Minimalist White Tee',
    description: 'Pure cotton comfort basic',
    fullDescription: 'A versatile white t-shirt made from 100% organic cotton. Soft, breathable, and easy to style with any outfit. Perfect for layering or wearing on its own. Pre-shrunk for lasting fit.',
    price: 49,
    category: 'tops',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1618354649887-aadb303f43a0?w=400&h=600&fit=crop',
    ],
    colors: [
      {
        id: 'c2-white',
        name: 'White',
        hex: '#FFFFFF',
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop',
        ],
      },
      {
        id: 'c2-black',
        name: 'Black',
        hex: '#000000',
        images: [
          'https://images.unsplash.com/photo-1618354649887-aadb303f43a0?w=400&h=600&fit=crop',
        ],
      },
      {
        id: 'c2-gray',
        name: 'Gray',
        hex: '#808080',
        images: [
          'https://images.unsplash.com/photo-1618354649887-aadb303f43a0?w=400&h=600&fit=crop',
        ],
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 120,
    rating: 4.5,
    reviews: 234,
    isFeatured: true,
    isNew: true,
  },
  {
    id: '3',
    name: 'Premium Denim Jeans',
    description: 'Comfortable fit denim',
    fullDescription: 'High-quality denim jeans with a perfect balance of comfort and style. Crafted from premium denim with a slight stretch for maximum comfort. Available in multiple washes.',
    price: 129,
    discount: 15,
    category: 'bottoms',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1537354284424-21e04b7a44a7?w=400&h=600&fit=crop',
    ],
    colors: [
      {
        id: 'c3-blue',
        name: 'Blue',
        hex: '#1E90FF',
        images: [
          'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=600&fit=crop',
        ],
      },
      {
        id: 'c3-black',
        name: 'Black',
        hex: '#000000',
        images: [
          'https://images.unsplash.com/photo-1537354284424-21e04b7a44a7?w=400&h=600&fit=crop',
        ],
      },
    ],
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    stock: 67,
    rating: 4.6,
    reviews: 189,
    isBestSeller: true,
  },
  {
    id: '4',
    name: 'Silk Blend Blouse',
    description: 'Luxurious silk-like fabric',
    fullDescription: 'An elegant blouse made from a comfortable silk-blend fabric. Perfect for professional environments or casual wear. Smooth texture with a sophisticated sheen.',
    price: 159,
    category: 'tops',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506629082632-11faf18c3f56?w=400&h=600&fit=crop',
    ],
    colors: [
      {
        id: 'c4-beige',
        name: 'Beige',
        hex: '#F5DEB3',
        images: [
          'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=600&fit=crop',
        ],
      },
      {
        id: 'c4-rose',
        name: 'Rose',
        hex: '#FF007F',
        images: [
          'https://images.unsplash.com/photo-1506629082632-11faf18c3f56?w=400&h=600&fit=crop',
        ],
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 32,
    rating: 4.7,
    reviews: 97,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Leather Ankle Boots',
    description: 'Premium leather boots',
    fullDescription: 'Sophisticated ankle boots crafted from genuine leather. Comfortable heel with cushioned insole. Versatile design that pairs well with dresses, jeans, or skirts.',
    price: 249,
    category: 'footwear',
    images: [
      'https://images.unsplash.com/photo-1587563871519-503a083f5b97?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1543163521-9145f931b24b?w=400&h=600&fit=crop',
    ],
    colors: [
      {
        id: 'c5-black',
        name: 'Black',
        hex: '#000000',
        images: [
          'https://images.unsplash.com/photo-1587563871519-503a083f5b97?w=400&h=600&fit=crop',
        ],
      },
      {
        id: 'c5-brown',
        name: 'Brown',
        hex: '#8B4513',
        images: [
          'https://images.unsplash.com/photo-1543163521-9145f931b24b?w=400&h=600&fit=crop',
        ],
      },
    ],
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    stock: 28,
    rating: 4.9,
    reviews: 156,
    isBestSeller: true,
  },
  {
    id: '6',
    name: 'Wool Blend Cardigan',
    description: 'Cozy and warm cardigan',
    fullDescription: 'A beautiful cardigan made from premium wool blend. Perfect for layering during cooler months. Features functional buttons and side pockets for comfort and style.',
    price: 179,
    discount: 20,
    category: 'jackets',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=400&h=600&fit=crop',
    ],
    colors: [
      {
        id: 'c6-cream',
        name: 'Cream',
        hex: '#FFFDD0',
        images: [
          'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=600&fit=crop',
        ],
      },
      {
        id: 'c6-gray',
        name: 'Gray',
        hex: '#A9A9A9',
        images: [
          'https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=400&h=600&fit=crop',
        ],
      },
      {
        id: 'c6-navy',
        name: 'Navy',
        hex: '#001f3f',
        images: [
          'https://images.unsplash.com/photo-1536882240095-0379873feb4e?w=400&h=600&fit=crop',
        ],
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 54,
    rating: 4.7,
    reviews: 112,
  },
  {
    id: '7',
    name: 'Midi Skirt',
    description: 'Elegant midi length skirt',
    fullDescription: 'A versatile midi skirt perfect for any occasion. Made from breathable fabric with an elastic waist for comfort. Can be styled with any top for a complete look.',
    price: 99,
    category: 'bottoms',
    images: [
      'https://images.unsplash.com/photo-1511498827210-1f83a13de928?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542082783-8b2a8c7b8c1f?w=400&h=600&fit=crop',
    ],
    colors: [
      {
        id: 'c7-black',
        name: 'Black',
        hex: '#000000',
        images: [
          'https://images.unsplash.com/photo-1511498827210-1f83a13de928?w=400&h=600&fit=crop',
        ],
      },
      {
        id: 'c7-white',
        name: 'White',
        hex: '#FFFFFF',
        images: [
          'https://images.unsplash.com/photo-1542082783-8b2a8c7b8c1f?w=400&h=600&fit=crop',
        ],
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 41,
    rating: 4.4,
    reviews: 78,
  },
  {
    id: '8',
    name: 'Summer Dress',
    description: 'Light and breezy sundress',
    fullDescription: 'Perfect for warm weather, this light and breathable summer dress is made from natural fabric. Flattering cut that works for various body types. Easy to dress up or down.',
    price: 119,
    discount: 25,
    category: 'dresses',
    images: [
      'https://images.unsplash.com/photo-1572804419217-7b520b1b6289?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-5dca89f118e5?w=400&h=600&fit=crop',
    ],
    colors: [
      {
        id: 'c8-blue',
        name: 'Blue',
        hex: '#87CEEB',
        images: [
          'https://images.unsplash.com/photo-1572804419217-7b520b1b6289?w=400&h=600&fit=crop',
        ],
      },
      {
        id: 'c8-coral',
        name: 'Coral',
        hex: '#FF7F50',
        images: [
          'https://images.unsplash.com/photo-1515562141207-5dca89f118e5?w=400&h=600&fit=crop',
        ],
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 73,
    rating: 4.6,
    reviews: 145,
    isNew: true,
  },
  {
    id: '9',
    name: 'Canvas Sneakers',
    description: 'Comfortable everyday sneakers',
    fullDescription: 'Casual canvas sneakers perfect for everyday wear. Lightweight and flexible, ideal for all-day comfort. Available in various color options to match any style.',
    price: 79,
    category: 'footwear',
    images: [
      'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop',
    ],
    colors: [
      {
        id: 'c9-white',
        name: 'White',
        hex: '#FFFFFF',
        images: [
          'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=600&fit=crop',
        ],
      },
      {
        id: 'c9-black',
        name: 'Black',
        hex: '#000000',
        images: [
          'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop',
        ],
      },
    ],
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    stock: 95,
    rating: 4.3,
    reviews: 201,
    isFeatured: true,
  },
  {
    id: '10',
    name: 'Statement Necklace',
    description: 'Bold fashion accessory',
    fullDescription: 'An eye-catching statement necklace that instantly elevates any outfit. Made from high-quality materials with an adjustable length. Perfect for special occasions or adding flair to everyday looks.',
    price: 69,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=600&fit=crop',
    ],
    colors: [
      {
        id: 'c10-gold',
        name: 'Gold',
        hex: '#FFD700',
        images: [
          'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop',
        ],
      },
      {
        id: 'c10-silver',
        name: 'Silver',
        hex: '#C0C0C0',
        images: [
          'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=600&fit=crop',
        ],
      },
    ],
    sizes: ['One Size'],
    stock: 38,
    rating: 4.5,
    reviews: 89,
  },
];
