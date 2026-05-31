import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
  IoMenuOutline,
  IoCloseOutline,
} from 'react-icons/io5';
import { useCart } from '../context/CartContext.tsx';
import { useSearch } from '../context/SearchContext.tsx';

const NAV_LINK_CLASS =
  'inline-flex items-center font-medium text-[15px] text-[#44403C] no-underline outline-offset-8 transition-colors duration-300 hover:text-[#1C1917]';

const MEGA_MENU_LINK_CLASS =
  'font-medium text-[15px] leading-snug text-[#78716C] hover:text-[#1C1917] transition-colors duration-300 ease-out no-underline block py-1.5';

const MEGA_MENU_COLUMNS = [
  {
    title: 'CATEGORIES',
    links: [
      { label: 'Women', to: '/shop?category=women' },
      { label: 'Men', to: '/shop?category=men' },
      { label: 'Collections', to: '/shop?category=collections' },
      { label: 'New Arrivals', to: '/shop?category=new-arrivals' },
    ],
  },
  {
    title: 'EDITORIAL',
    links: [
      { label: 'The Journal', to: '/shop?category=journal' },
      { label: 'Lookbook', to: '/shop?category=lookbook' },
      { label: 'Campaigns', to: '/shop?category=campaigns' },
      { label: 'Press', to: '/shop?category=press' },
    ],
  },
  {
    title: 'EXPLORE',
    links: [
      { label: 'Stores', to: '/shop?category=stores' },
      { label: 'Gift Guide', to: '/shop?category=gift-guide' },
      { label: 'Care Guide', to: '/shop?category=care-guide' },
      { label: 'Footwear', to: '/shop?category=footwear' },
    ],
  },
] as const;

const LOOKBOOK_THUMB =
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop&auto=format';

export default function SiteHeader() {
  const { cartCount } = useCart();
  const {
    searchQuery,
    isSearchOpen,
    setSearchQuery,
    openSearch,
    closeSearch,
    clearSearch,
    resetSearch,
    requestSearchOnShop,
    hasPendingShopOpen,
  } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const prevPathnameRef = useRef(location.pathname);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const shopCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressHoverOpenRef = useRef(false);
  const [hoverCapable, setHoverCapable] = useState(true);

  const clearShopCloseTimer = useCallback(() => {
    if (shopCloseTimer.current) {
      clearTimeout(shopCloseTimer.current);
      shopCloseTimer.current = null;
    }
  }, []);

  const openShopMenu = useCallback(() => {
    clearShopCloseTimer();
    setShopMenuOpen(true);
  }, [clearShopCloseTimer]);

  const scheduleCloseShopMenu = useCallback(() => {
    clearShopCloseTimer();
    shopCloseTimer.current = setTimeout(() => setShopMenuOpen(false), 220);
  }, [clearShopCloseTimer]);

  const closeShopMenu = useCallback(() => {
    clearShopCloseTimer();
    setShopMenuOpen(false);
  }, [clearShopCloseTimer]);

  const handleNavigationClose = useCallback(() => {
    suppressHoverOpenRef.current = true;
    closeShopMenu();
    setMobileNavOpen(false);
    resetSearch();
  }, [closeShopMenu, resetSearch]);

  const handleHoverOpen = useCallback(() => {
    if (!hoverCapable || suppressHoverOpenRef.current) return;
    openShopMenu();
  }, [hoverCapable, openShopMenu]);

  const handleHeaderMouseLeave = useCallback(() => {
    suppressHoverOpenRef.current = false;
    scheduleCloseShopMenu();
  }, [scheduleCloseShopMenu]);

  const handleMegaMenuLinkClick = useCallback(() => {
    suppressHoverOpenRef.current = true;
    closeShopMenu();
  }, [closeShopMenu]);

  useEffect(() => () => clearShopCloseTimer(), [clearShopCloseTimer]);

  useEffect(() => {
    const previousPath = prevPathnameRef.current;
    prevPathnameRef.current = location.pathname;

    suppressHoverOpenRef.current = true;
    closeShopMenu();
    setMobileNavOpen(false);

    if (location.pathname !== '/shop') {
      resetSearch();
      return;
    }

    if (previousPath !== '/shop' && !hasPendingShopOpen()) {
      resetSearch();
    }
  }, [location.pathname, location.key, closeShopMenu, resetSearch, hasPendingShopOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    const sync = () => setHoverCapable(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!shopMenuOpen || hoverCapable) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const panel = document.getElementById('shop-mega-panel');
      const trigger = document.getElementById('shop-mega-trigger');
      if (panel?.contains(target) || trigger?.contains(target)) return;
      closeShopMenu();
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [shopMenuOpen, hoverCapable, closeShopMenu]);

  const onShopMainClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hoverCapable && !shopMenuOpen) {
      e.preventDefault();
      openShopMenu();
    }
  };

  const handleSearchToggle = useCallback(() => {
    if (isSearchOpen) {
      resetSearch();
      return;
    }
    closeShopMenu();
    setMobileNavOpen(false);

    if (location.pathname !== '/shop') {
      requestSearchOnShop();
      navigate('/shop');
      return;
    }

    clearSearch();
    openSearch();
  }, [
    isSearchOpen,
    resetSearch,
    closeShopMenu,
    requestSearchOnShop,
    clearSearch,
    openSearch,
    location.pathname,
    navigate,
  ]);

  useEffect(() => {
    if (!isSearchOpen || location.pathname !== '/shop') return;
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 120);
    return () => window.clearTimeout(timer);
  }, [isSearchOpen, location.pathname]);

  return (
    <>
    <header
      className="site-header sticky top-0 z-50 min-h-[5rem] border-b border-stone-200/50 bg-[#FAFAF9]/80 backdrop-blur-md"
      onMouseLeave={handleHeaderMouseLeave}
      onBlurCapture={(e) => {
        const next = e.relatedTarget as Node | null;
        if (next && e.currentTarget.contains(next)) return;
        scheduleCloseShopMenu();
      }}
    >
      <div className="mx-auto flex min-h-[5rem] w-full max-w-[100%] items-center justify-between px-[clamp(1rem,4vw,3rem)]">
        <Link to="/" className="font-bold text-[clamp(1.25rem,2.5vw,1.5rem)] text-[#1C1917] no-underline">
          CHATGA
        </Link>
        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-[clamp(1rem,3vw,2rem)] md:flex"
          aria-label="Primary"
        >
          <Link to="/" className={NAV_LINK_CLASS} onClick={handleNavigationClose}>
            Home
          </Link>
          <div
            id="shop-mega-trigger"
            className="relative inline-block"
            onMouseEnter={handleHoverOpen}
            onMouseLeave={() => hoverCapable && scheduleCloseShopMenu()}
          >
            <Link
              to="/shop"
              className={NAV_LINK_CLASS}
              aria-haspopup="true"
              aria-expanded={shopMenuOpen}
              aria-controls="shop-mega-panel"
              onClick={(e) => {
                if (location.pathname !== '/shop') {
                  handleNavigationClose();
                }
                onShopMainClick(e);
              }}
              onFocus={() => !suppressHoverOpenRef.current && openShopMenu()}
            >
              Shop
            </Link>
          </div>
          <Link to="/about" className={NAV_LINK_CLASS} onClick={handleNavigationClose}>
            About
          </Link>
        </nav>

        <div className="flex items-center gap-[clamp(0.75rem,2vw,1.5rem)]">
          <button
            type="button"
            className="inline-flex items-center justify-center md:hidden"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-primary-nav"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            {mobileNavOpen ? (
              <IoCloseOutline className="h-6 w-6 text-[#44403C]" />
            ) : (
              <IoMenuOutline className="h-6 w-6 text-[#44403C]" />
            )}
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center text-[#44403C] transition-colors duration-300 hover:text-[#1C1917]"
            aria-expanded={isSearchOpen}
            aria-controls="search-drawer"
            aria-label="Search collection"
            onClick={handleSearchToggle}
          >
            <IoSearchOutline className="h-5 w-5" aria-hidden />
          </button>
          <IoPersonOutline className="h-5 w-5 text-[#44403C]" aria-hidden />
          <IoHeartOutline className="h-5 w-5 text-[#44403C]" aria-hidden />
          <div className="relative">
            <IoBagOutline className="h-5 w-5 text-[#44403C]" aria-hidden />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-[#1C1917] px-1 text-[10px] font-medium text-white">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <nav
        id="mobile-primary-nav"
        aria-label="Primary mobile"
        className={`border-t border-stone-200/50 bg-[#FAFAF9]/95 backdrop-blur-md md:hidden ${
          mobileNavOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col px-[clamp(1rem,4vw,3rem)] py-4" role="list">
          <li>
            <Link to="/" className={`${NAV_LINK_CLASS} block py-3`} onClick={handleNavigationClose}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className={`${NAV_LINK_CLASS} block py-3`} onClick={handleNavigationClose}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/about" className={`${NAV_LINK_CLASS} block py-3`} onClick={handleNavigationClose}>
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* Search drawer — slides down from sticky header */}
      <div
        id="search-drawer"
        aria-hidden={!isSearchOpen}
        className={`overflow-hidden border-stone-200/50 bg-[#FAFAF9]/95 backdrop-blur-md transition-[max-height,opacity,border-color] duration-300 ease-out ${
          isSearchOpen ? 'max-h-28 border-t opacity-100' : 'max-h-0 border-t-0 opacity-0'
        }`}
      >
        <div className="relative px-[clamp(1rem,4vw,3rem)] py-5">
          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the CHATGA collection..."
            className="w-full border-0 border-b border-stone-300 bg-transparent py-3 pr-10 text-[15px] font-normal text-[#1C1917] outline-none transition-colors duration-300 placeholder:text-[#A8A29E] focus:border-[#1C1917]"
            aria-label="Search the CHATGA collection"
          />
          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-[clamp(1rem,4vw,3rem)] top-1/2 -translate-y-1/2 p-1 text-[#78716C] transition-colors duration-300 hover:text-[#1C1917]"
              aria-label="Clear search"
            >
              <IoCloseOutline className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div
        id="shop-mega-panel"
        role="region"
        aria-label="Shop navigation"
        onMouseEnter={handleHoverOpen}
        onMouseLeave={() => hoverCapable && scheduleCloseShopMenu()}
        aria-hidden={!shopMenuOpen}
        className={`absolute left-0 right-0 top-full z-40 border-t border-[#E7E5E4]/50 bg-[#FAFAF9]/80 backdrop-blur-md transition-[opacity,transform,visibility] duration-300 ease-out motion-reduce:transition-none ${
          shopMenuOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <div className="mx-auto w-full px-[clamp(1rem,4vw,3rem)] py-14">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:gap-x-[clamp(1rem,3vw,4rem)]">
            {MEGA_MENU_COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="mb-6 font-bold text-[10px] uppercase tracking-[0.14em] text-[#1C1917]">
                  {column.title}
                </p>
                <ul className="space-y-0.5" role="list">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        tabIndex={shopMenuOpen ? 0 : -1}
                        className={MEGA_MENU_LINK_CLASS}
                        onClick={handleMegaMenuLinkClick}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 flex flex-col items-start sm:col-span-1">
              <Link
                to="/shop?category=lookbook"
                tabIndex={shopMenuOpen ? 0 : -1}
                className="group block w-full max-w-[min(100%,12.5rem)] no-underline"
                onClick={handleMegaMenuLinkClick}
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#F5F5F4]">
                  <img src={LOOKBOOK_THUMB} alt="Lookbook preview" className="h-full w-full object-cover" />
                </div>
                <p className="mt-4 block font-medium text-[13px] leading-snug text-[#78716C] transition-colors duration-300 ease-out group-hover:text-[#1C1917]">
                  The Lookbook — Browse
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>

    {isSearchOpen && (
      <button
        type="button"
        className="fixed inset-0 top-[5rem] z-40 cursor-default bg-[#1C1917]/[0.03] backdrop-blur-sm"
        aria-label="Close search"
        onClick={closeSearch}
      />
    )}
    </>
  );
}
