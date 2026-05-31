import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SiteHeader from './components/SiteHeader.tsx';
import SiteFooter from './components/SiteFooter.tsx';
import ProductCard, { type CatalogProduct } from './components/ProductCard.tsx';
import { useSearch } from './context/SearchContext.tsx';
import { CATALOG_PRODUCTS, matchesSearchQuery } from './data/catalogProducts.ts';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]['value'];

function gridPlacementClass(product: CatalogProduct, index: number): string {
  if (product.spotlight) {
    return 'col-span-2 row-span-2 lg:col-span-2 lg:row-span-2';
  }
  if (index === 1 || index === 2) {
    return 'col-span-1 lg:col-span-1';
  }
  return 'col-span-1 lg:col-span-1';
}

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category')?.trim().toLowerCase() ?? '';
  const { searchQuery, consumePendingShopOpen } = useSearch();

  useLayoutEffect(() => {
    consumePendingShopOpen();
  }, [consumePendingShopOpen]);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortValue>('featured');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(3000);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const sortedProducts = useMemo(() => {
    const list = [...CATALOG_PRODUCTS].filter((p) => {
      if (urlCategory && p.category !== urlCategory) return false;
      if (!matchesSearchQuery(p, searchQuery)) return false;
      if (p.priceValue > priceMax) return false;
      if (categoryFilter.length > 0 && !categoryFilter.includes(p.subCategory)) return false;
      if (sizeFilter.length > 0) return false;
      return true;
    });
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.priceValue - b.priceValue);
      case 'price-desc':
        return list.sort((a, b) => b.priceValue - a.priceValue);
      case 'newest':
        return list.sort((a, b) => Number(b.id) - Number(a.id));
      default:
        return list;
    }
  }, [sortBy, categoryFilter, sizeFilter, priceMax, urlCategory, searchQuery]);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Featured';

  const toggleFilter = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAF9] font-['Inter']">
      <SiteHeader />

      <main className="mx-auto w-full">
        {/* Context block */}
        <section className="px-[clamp(1rem,4vw,3rem)] pb-[clamp(1.5rem,4vw,2.5rem)] pt-[clamp(2.5rem,7vw,5rem)]">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#A8A29E]">
              <li>
                <Link to="/" className="text-[#78716C] transition-colors duration-300 hover:text-[#1C1917]">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-[#D6D3D1]">
                /
              </li>
              <li>
                <span className="text-[#78716C]">Shop</span>
              </li>
              <li aria-hidden className="text-[#D6D3D1]">
                /
              </li>
              <li>
                <span className="text-[#1C1917]">
                  {urlCategory
                    ? urlCategory.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                    : 'All Apparel'}
                </span>
              </li>
            </ol>
          </nav>
          <h1 className="font-['Inter'] text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-tight text-[#1C1917]">
            {urlCategory
              ? urlCategory.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
              : 'The Premium Catalog'}
          </h1>
          <p className="mt-4 max-w-prose text-[clamp(0.875rem,1.5vw,1rem)] font-normal leading-relaxed text-[#57534E]">
            Curated apparel and accessories — refined silhouettes for the modern wardrobe.
          </p>

          {/* Filter / sort bar — static flow beneath page title */}
          <div className="relative mt-[clamp(2rem,5vw,3rem)] block border-t border-[#E7E5E4]/60 pt-[clamp(1.25rem,3vw,2rem)]">
          <div className="flex w-full items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              className="text-[13px] font-medium text-[#78716C] transition-colors duration-300 hover:text-[#1C1917]"
              aria-expanded={filtersOpen}
              aria-controls="shop-filters-panel"
            >
              Filters
            </button>

            <div ref={sortRef} className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((o) => !o)}
                className="text-[13px] font-medium text-[#78716C] transition-colors duration-300 hover:text-[#1C1917]"
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
              >
                Sort By — {activeSortLabel}
              </button>
              {sortOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 top-full z-30 mt-2 min-w-[12rem] border border-[#E7E5E4] bg-[#FAFAF9]/95 py-2 shadow-sm backdrop-blur-md"
                >
                  {SORT_OPTIONS.map((option) => (
                    <li key={option.value} role="option" aria-selected={sortBy === option.value}>
                      <button
                        type="button"
                        className="block w-full px-4 py-2 text-left text-[13px] font-medium text-[#78716C] transition-colors duration-300 hover:text-[#1C1917]"
                        onClick={() => {
                          setSortBy(option.value);
                          setSortOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Filters drawer */}
          <div
            id="shop-filters-panel"
            className={`overflow-hidden border-t border-[#E7E5E4]/50 transition-[max-height,opacity] duration-300 ease-out ${
              filtersOpen ? 'max-h-[24rem] opacity-100' : 'max-h-0 opacity-0'
            }`}
            aria-hidden={!filtersOpen}
          >
            <div className="grid gap-8 py-6 sm:grid-cols-3">
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1C1917]">
                  Category
                </p>
                <ul className="space-y-2">
                  {['Knitwear', 'Outerwear', 'Tops', 'Accessories', 'Dresses', 'Skirts', 'Footwear'].map(
                    (cat) => (
                      <li key={cat}>
                        <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-[#78716C] transition-colors duration-300 hover:text-[#1C1917]">
                          <input
                            type="checkbox"
                            checked={categoryFilter.includes(cat)}
                            onChange={() => toggleFilter(cat, setCategoryFilter)}
                            className="accent-[#1C1917]"
                          />
                          {cat}
                        </label>
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1C1917]">Size</p>
                <ul className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <li key={size}>
                      <button
                        type="button"
                        onClick={() => toggleFilter(size, setSizeFilter)}
                        className={`min-w-[2.25rem] border px-2 py-1 text-[12px] font-medium transition-colors duration-300 ${
                          sizeFilter.includes(size)
                            ? 'border-[#1C1917] text-[#1C1917]'
                            : 'border-[#E7E5E4] text-[#78716C] hover:text-[#1C1917]'
                        }`}
                      >
                        {size}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1C1917]">
                  Price range
                </p>
                <label className="block text-[13px] font-medium text-[#78716C]">
                  Up to ${priceMax.toLocaleString()}
                  <input
                    type="range"
                    min={200}
                    max={3000}
                    step={50}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="mt-3 w-full accent-[#1C1917]"
                  />
                </label>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Asymmetric product matrix */}
        <section className="px-[clamp(1rem,4vw,3rem)] py-[clamp(2rem,6vw,4rem)]">
          <div className="grid grid-flow-dense grid-cols-2 auto-rows-auto gap-x-[clamp(0.5rem,2vw,1.5rem)] gap-y-[clamp(1.5rem,4vw,3rem)] pb-24 lg:grid-cols-4 lg:gap-x-[clamp(0.75rem,2vw,1.5rem)]">
            {sortedProducts.map((product, index) => (
              <div key={product.id} className={`min-w-0 ${gridPlacementClass(product, index)}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {sortedProducts.length === 0 && (
            <p className="py-16 text-center text-sm font-medium text-[#78716C]">
              No pieces match your filters.
            </p>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
