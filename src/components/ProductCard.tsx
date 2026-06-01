import { useCart } from '../context/CartContext.tsx';

export type CatalogProduct = {
  id: string;
  brand: string;
  title: string;
  subCategory: string;
  /** URL query slug — matched by `?category=` from mega menu / deep links */
  category: string;
  price: string;
  priceValue: number;
  primaryImageUrl: string;
  hoverImageUrl: string;
  spotlight?: boolean;
};

type ProductCardProps = {
  product: CatalogProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="group flex h-full min-w-0 flex-col">
      <div
        className={`relative w-full overflow-hidden bg-[#F5F5F4] ${
          product.spotlight ? 'aspect-[3/4] lg:aspect-[4/5]' : 'aspect-[4/5]'
        }`}
      >
        <img
          src={product.primaryImageUrl}
          alt={product.title}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
        />
        <img
          src={product.hoverImageUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        />
      </div>
      <div className="mt-[clamp(1rem,2.5vw,1.75rem)] min-w-0 space-y-1">
        <p className="truncate text-[11px] font-medium uppercase tracking-[0.08em] text-[#78716C]">
          {product.brand}
        </p>
        <p className="truncate text-[13px] font-normal leading-snug text-[#1C1917]">{product.title}</p>
        <p className="text-[11px] font-light text-[#A8A29E]">{product.subCategory}</p>
        <p className="pt-1 text-[13px] font-medium text-[#1C1917]">{product.price}</p>
        <button
          type="button"
          onClick={() =>
            addItem({
              id: product.id,
              name: `${product.brand} ${product.title}`,
              price: product.priceValue,
              image: product.primaryImageUrl,
            })
          }
          className="mt-4 w-full border border-[#1C1917] bg-transparent py-2.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#1C1917] transition-colors duration-300 hover:bg-[#1C1917] hover:text-white"
        >
          Add to Bag
        </button>
      </div>
    </article>
  );
}
