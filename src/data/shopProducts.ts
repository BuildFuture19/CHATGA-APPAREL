export type ShopProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  /** URL query slug — matched by `?category=` from mega menu */
  category: string;
  subCategory: string;
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'silk-crepe-blouse',
    name: 'Silk Crepe Blouse',
    price: 650,
    image:
      'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=720&h=900&fit=crop&auto=format',
    category: 'women',
    subCategory: 'Tops',
  },
  {
    id: 'italian-wool-blazer',
    name: 'Italian Wool Blazer',
    price: 890,
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=720&h=900&fit=crop&auto=format',
    category: 'men',
    subCategory: 'Outerwear',
  },
  {
    id: 'tailored-wide-leg-trousers',
    name: 'Tailored Wide-Leg Trousers',
    price: 520,
    image:
      'https://images.unsplash.com/photo-1473966968600-fa801b544a88?w=720&h=900&fit=crop&auto=format',
    category: 'women',
    subCategory: 'Tops',
  },
  {
    id: 'cashmere-rib-turtleneck',
    name: 'Cashmere Rib Turtleneck',
    price: 485,
    image:
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=720&h=900&fit=crop&auto=format',
    category: 'collections',
    subCategory: 'Knitwear',
  },
  {
    id: 'double-face-wool-coat',
    name: 'Double-Face Wool Coat',
    price: 1280,
    image:
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=720&h=900&fit=crop&auto=format',
    category: 'new-arrivals',
    subCategory: 'Outerwear',
  },
  {
    id: 'satin-bias-slip-skirt',
    name: 'Satin Bias Slip Skirt',
    price: 780,
    image:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=720&h=900&fit=crop&auto=format',
    category: 'lookbook',
    subCategory: 'Skirts',
  },
  {
    id: 'mercerized-cotton-shirt',
    name: 'Mercerized Cotton Shirt',
    price: 395,
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2f?w=720&h=900&fit=crop&auto=format',
    category: 'men',
    subCategory: 'Tops',
  },
  {
    id: 'structured-leather-tote',
    name: 'Structured Leather Tote',
    price: 2450,
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=720&h=900&fit=crop&auto=format',
    category: 'gift-guide',
    subCategory: 'Accessories',
  },
  {
    id: 'linen-resort-blazer',
    name: 'Linen Resort Blazer',
    price: 720,
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=720&h=900&fit=crop&auto=format',
    category: 'women',
    subCategory: 'Outerwear',
  },
  {
    id: 'pleated-midi-dress',
    name: 'Pleated Midi Dress',
    price: 940,
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=720&h=900&fit=crop&auto=format',
    category: 'collections',
    subCategory: 'Dresses',
  },
  {
    id: 'sculpted-leather-loafers',
    name: 'Sculpted Leather Loafers',
    price: 990,
    image:
      'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=720&h=900&fit=crop&auto=format',
    category: 'footwear',
    subCategory: 'Footwear',
  },
  {
    id: 'fine-gauge-merino-cardigan',
    name: 'Fine Gauge Merino Cardigan',
    price: 560,
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=720&h=900&fit=crop&auto=format',
    category: 'new-arrivals',
    subCategory: 'Knitwear',
  },
];

export function formatProductPrice(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function matchesSearchQuery(product: ShopProduct, query: string): boolean {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;

  const haystack = [product.name, product.subCategory, product.category].join(' ').toLowerCase();
  return haystack.includes(trimmed);
}
