import type { CatalogProduct } from '../components/ProductCard.tsx';

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: '1',
    brand: 'Maison Margiela',
    title: 'Cashmere Blend Turtleneck',
    subCategory: 'Knitwear',
    category: 'women',
    price: '$485',
    priceValue: 485,
    primaryImageUrl:
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=750&fit=crop&auto=format',
    hoverImageUrl:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=750&fit=crop&auto=format',
    spotlight: true,
  },
  {
    id: '2',
    brand: 'Lemaire',
    title: 'Oversized Wool Blazer',
    subCategory: 'Outerwear',
    category: 'men',
    price: '$890',
    priceValue: 890,
    primaryImageUrl:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop&auto=format',
    hoverImageUrl:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=750&fit=crop&auto=format',
  },
  {
    id: '3',
    brand: 'The Row',
    title: 'Silk Crepe Blouse',
    subCategory: 'Tops',
    category: 'lookbook',
    price: '$650',
    priceValue: 650,
    primaryImageUrl:
      'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&h=750&fit=crop&auto=format',
    hoverImageUrl:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=750&fit=crop&auto=format',
  },
  {
    id: '4',
    brand: 'Bottega Veneta',
    title: 'Leather Shoulder Bag',
    subCategory: 'Accessories',
    category: 'gift-guide',
    price: '$2,450',
    priceValue: 2450,
    primaryImageUrl:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop&auto=format',
    hoverImageUrl:
      'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&h=750&fit=crop&auto=format',
  },
  {
    id: '5',
    brand: 'Jil Sander',
    title: 'Structured Column Coat',
    subCategory: 'Outerwear',
    category: 'collections',
    price: '$1,280',
    priceValue: 1280,
    primaryImageUrl:
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=750&fit=crop&auto=format',
    hoverImageUrl:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=750&fit=crop&auto=format',
    spotlight: true,
  },
  {
    id: '6',
    brand: 'Totême',
    title: 'Merino Rib Knit Dress',
    subCategory: 'Dresses',
    category: 'new-arrivals',
    price: '$520',
    priceValue: 520,
    primaryImageUrl:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=750&fit=crop&auto=format',
    hoverImageUrl:
      'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=750&fit=crop&auto=format',
  },
  {
    id: '7',
    brand: 'Khaite',
    title: 'Satin Bias Slip Skirt',
    subCategory: 'Skirts',
    category: 'women',
    price: '$780',
    priceValue: 780,
    primaryImageUrl:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=750&fit=crop&auto=format',
    hoverImageUrl:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=750&fit=crop&auto=format',
  },
  {
    id: '8',
    brand: 'Loewe',
    title: 'Sculpted Leather Loafers',
    subCategory: 'Footwear',
    category: 'footwear',
    price: '$990',
    priceValue: 990,
    primaryImageUrl:
      'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&h=750&fit=crop&auto=format',
    hoverImageUrl:
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=750&fit=crop&auto=format',
  },
];

export function matchesSearchQuery(product: CatalogProduct, query: string): boolean {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;

  const haystack = [product.brand, product.title, product.subCategory, product.category]
    .join(' ')
    .toLowerCase();

  return haystack.includes(trimmed);
}
