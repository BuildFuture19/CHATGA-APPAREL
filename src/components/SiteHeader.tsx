import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  IoSearchOutline,
  IoPersonOutline,
  IoHeartOutline,
  IoBagOutline,
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
const USE_PREMIUM_DRAWER = true; // Set to false to test the old mobile dropdown layout

const MOBILE_DRAWER_SHOP_LINKS = [
  { label: 'Women', to: '/shop?category=women' },
  { label: 'Men', to: '/shop?category=men' },
  { label: 'New Arrivals', to: '/shop?category=new-arrivals' },
  { label: 'Lookbook', to: '/shop?category=lookbook' },
] as const;

const MOBILE_DRAWER_SECTION_LABEL =
  'text-[10px] font-bold uppercase tracking-[0.14em] text-[#A8A29E]';

export default function SiteHeader() {
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const shopCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  /** Force megamenu closed and restore hover so it can reopen without mouse leave */
  const forceCloseMegaMenu = useCallback(() => {
    clearShopCloseTimer();
    setShopMenuOpen(false);
  }, [clearShopCloseTimer]);

  const closeMenu = useCallback(() => {
    if (USE_PREMIUM_DRAWER) {
      setIsMenuOpen(false);
      setIsMobileShopOpen(false);
      return;
    }
    setMobileNavOpen(false);
  }, []);

  const handleMobileShopAllNavigate = useCallback(() => {
    forceCloseMegaMenu();
    resetSearch();
    closeMenu();
    navigate('/shop');
  }, [forceCloseMegaMenu, resetSearch, closeMenu, navigate]);

  const handleMobileDrawerShopClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (!isMobileShopOpen) {
        setIsMobileShopOpen(true);
        return;
      }
      handleMobileShopAllNavigate();
    },
    [isMobileShopOpen, handleMobileShopAllNavigate],
  );

  const handleMenuButtonClick = useCallback(() => {
    forceCloseMegaMenu();
    if (isSearchOpen) closeSearch();
    if (USE_PREMIUM_DRAWER) {
      setIsMenuOpen(true);
      return;
    }
    setMobileNavOpen((open) => !open);
  }, [forceCloseMegaMenu, isSearchOpen, closeSearch]);

  const handleNavigationClose = useCallback(() => {
    forceCloseMegaMenu();
    if (USE_PREMIUM_DRAWER) {
      setIsMenuOpen(false);
    } else {
      setMobileNavOpen(false);
    }
    resetSearch();
  }, [forceCloseMegaMenu, resetSearch]);

  const handleHoverOpen = useCallback(() => {
    if (!hoverCapable) return;
    openShopMenu();
  }, [hoverCapable, openShopMenu]);

  const handleHeaderMouseLeave = useCallback(() => {
    scheduleCloseShopMenu();
  }, [scheduleCloseShopMenu]);

  const handleMegaMenuLinkClick = useCallback(() => {
    forceCloseMegaMenu();
  }, [forceCloseMegaMenu]);

  const handleShopNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      forceCloseMegaMenu();
      resetSearch();
      setIsMenuOpen(false);
      setMobileNavOpen(false);
      setIsMobileShopOpen(false);

      if (location.pathname === '/shop') {
        e.preventDefault();
        navigate('/shop', { replace: true });
        return;
      }

      if (hoverCapable) {
        return;
      }

      if (!shopMenuOpen) {
        e.preventDefault();
        openShopMenu();
      }
    },
    [forceCloseMegaMenu, resetSearch, location.pathname, navigate, hoverCapable, shopMenuOpen, openShopMenu],
  );

  useEffect(() => () => clearShopCloseTimer(), [clearShopCloseTimer]);

  useEffect(() => {
    const previousPath = prevPathnameRef.current;
    prevPathnameRef.current = location.pathname;

    forceCloseMegaMenu();
    setIsMenuOpen(false);
    setIsMobileShopOpen(false);
    setMobileNavOpen(false);

    if (location.pathname !== '/shop') {
      resetSearch();
      return;
    }

    if (previousPath !== '/shop' && !hasPendingShopOpen()) {
      resetSearch();
    }
  }, [location.pathname, location.key, forceCloseMegaMenu, resetSearch, hasPendingShopOpen]);

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

  const handleDrawerSearch = useCallback(() => {
    closeMenu();
    forceCloseMegaMenu();
    if (location.pathname !== '/shop') {
      requestSearchOnShop();
      navigate('/shop');
      return;
    }
    clearSearch();
    openSearch();
  }, [closeMenu, forceCloseMegaMenu, location.pathname, requestSearchOnShop, navigate, clearSearch, openSearch]);

  const handleCartOpen = useCallback(() => {
    forceCloseMegaMenu();
    if (USE_PREMIUM_DRAWER) {
      setIsMenuOpen(false);
    } else {
      setMobileNavOpen(false);
    }
    if (isSearchOpen) closeSearch();
    setIsCartOpen(true);
  }, [forceCloseMegaMenu, isSearchOpen, closeSearch, setIsCartOpen]);

  const handleSearchToggle = useCallback(() => {
    if (isSearchOpen) {
      resetSearch();
      return;
    }
    forceCloseMegaMenu();
    setIsMenuOpen(false);
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
    forceCloseMegaMenu,
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

  useEffect(() => {
    if (!USE_PREMIUM_DRAWER || !isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

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
        <Link
          to="/"
          className="font-bold text-[clamp(1.25rem,2.5vw,1.5rem)] text-[#1C1917] no-underline"
          onClick={handleNavigationClose}
        >
          CHATGA
        </Link>
        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
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
              onClick={handleShopNavClick}
              onFocus={() => openShopMenu()}
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
            className="block md:hidden"
            aria-expanded={USE_PREMIUM_DRAWER ? isMenuOpen : mobileNavOpen}
            aria-controls={USE_PREMIUM_DRAWER ? 'mobile-menu-drawer' : 'mobile-primary-nav'}
            aria-label="Open menu"
            onClick={handleMenuButtonClick}
          >
            <span className="flex h-3.5 w-5 flex-col justify-between" aria-hidden>
              <span className="block h-px w-full bg-[#44403C]" />
              <span className="block h-px w-full bg-[#44403C]" />
              <span className="block h-px w-full bg-[#44403C]" />
            </span>
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
          <button
            type="button"
            className="relative inline-flex items-center justify-center text-[#44403C] transition-colors duration-300 hover:text-[#1C1917]"
            aria-expanded={isCartOpen}
            aria-controls="cart-drawer"
            aria-label={totalItems > 0 ? `Shopping bag, ${totalItems} items` : 'Shopping bag'}
            onClick={handleCartOpen}
          >
            <IoBagOutline className="h-5 w-5" aria-hidden />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full border border-[#FAFAF9] bg-[#1C1917] px-1 text-[9px] font-medium leading-none text-white">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {!USE_PREMIUM_DRAWER && (
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
              <Link to="/shop" className={`${NAV_LINK_CLASS} block py-3`} onClick={handleShopNavClick}>
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
      )}

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

    {USE_PREMIUM_DRAWER && (
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-full md:hidden ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          tabIndex={isMenuOpen ? 0 : -1}
          aria-label="Close menu"
          onClick={closeMenu}
          className={`absolute inset-0 transform-gpu bg-black/30 backdrop-blur-sm transition-all duration-300 ease-out motion-reduce:transition-none ${
            isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        />

        <nav
          id="mobile-menu-drawer"
          aria-label="Primary mobile"
          className={`absolute left-0 top-0 z-[1] flex h-full w-[min(100vw-2.5rem,20rem)] transform-gpu flex-col bg-[#FAFAF9] text-[#1C1917] shadow-2xl transition-all duration-300 ease-out will-change-transform motion-reduce:transition-none sm:w-[320px] ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-[#E7E5E4]/80 px-6 py-5">
            <span className="text-[15px] font-bold tracking-tight text-[#1C1917]">CHATGA</span>
            <button
              type="button"
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center text-[22px] font-light leading-none text-[#78716C] transition-colors duration-300 hover:text-[#1C1917]"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="px-6 py-8">
              <p className={MOBILE_DRAWER_SECTION_LABEL}>Menu</p>
              <ul className="mt-5 space-y-1" role="list">
                <li>
                  <Link
                    to="/"
                    className="block py-2.5 text-[17px] font-medium tracking-[0.02em] text-[#1C1917] no-underline transition-colors duration-300 hover:text-[#57534E]"
                    onClick={handleNavigationClose}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="block py-2.5 text-[17px] font-medium tracking-[0.02em] text-[#1C1917] no-underline transition-colors duration-300 hover:text-[#57534E]"
                    aria-expanded={isMobileShopOpen}
                    aria-controls="mobile-shop-mega-accordion"
                    onClick={handleMobileDrawerShopClick}
                  >
                    Shop
                  </Link>
                  <div
                    id="mobile-shop-mega-accordion"
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                      isMobileShopOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isMobileShopOpen}
                  >
                    <div className="space-y-6 pb-2 pl-1 pt-2">
                      {MEGA_MENU_COLUMNS.map((column) => (
                        <div key={column.title}>
                          <p className="mb-3 font-bold text-[10px] uppercase tracking-[0.14em] text-[#1C1917]">
                            {column.title}
                          </p>
                          <ul className="space-y-0.5" role="list">
                            {column.links.map((link) => (
                              <li key={link.label}>
                                <Link
                                  to={link.to}
                                  className="block py-2 text-[14px] font-medium text-[#78716C] no-underline transition-colors duration-300 hover:text-[#1C1917]"
                                  onClick={() => {
                                    handleMegaMenuLinkClick();
                                    closeMenu();
                                  }}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link
                        to="/shop"
                        className="block py-2 text-[14px] font-medium text-[#1C1917] no-underline transition-colors duration-300 hover:text-[#57534E]"
                        onClick={(e) => {
                          e.preventDefault();
                          handleMobileShopAllNavigate();
                        }}
                      >
                        Shop All
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block py-2.5 text-[17px] font-medium tracking-[0.02em] text-[#1C1917] no-underline transition-colors duration-300 hover:text-[#57534E]"
                    onClick={handleNavigationClose}
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border-t border-[#E7E5E4]/80 px-6 py-8">
              <p className={MOBILE_DRAWER_SECTION_LABEL}>Shop</p>
              <ul className="mt-5 space-y-0.5" role="list">
                {MOBILE_DRAWER_SHOP_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="block py-2 text-[14px] font-medium text-[#78716C] no-underline transition-colors duration-300 hover:text-[#1C1917]"
                      onClick={handleMegaMenuLinkClick}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#E7E5E4]/80 px-6 py-8">
              <Link
                to="/shop?category=lookbook"
                className="group block no-underline"
                onClick={() => {
                  handleMegaMenuLinkClick();
                  closeMenu();
                }}
              >
                <div className="aspect-[5/4] w-full overflow-hidden bg-[#F5F5F4]">
                  <img
                    src={LOOKBOOK_THUMB}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 text-[12px] font-medium leading-snug text-[#78716C] transition-colors duration-300 group-hover:text-[#1C1917]">
                  The Lookbook — Browse the season
                </p>
              </Link>
            </div>
          </div>

          <div className="shrink-0 border-t border-[#E7E5E4]/80 px-6 py-6">
            <button
              type="button"
              onClick={handleDrawerSearch}
              className="flex w-full items-center justify-center gap-2 border border-[#D6D3D1] bg-transparent py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-[#1C1917] transition-colors duration-300 hover:border-[#1C1917] hover:bg-[#1C1917] hover:text-white"
            >
              <IoSearchOutline className="h-4 w-4" aria-hidden />
              Search Collection
            </button>
            <p className="mt-5 text-center text-[10px] font-light uppercase tracking-[0.16em] text-[#A8A29E]">
              Curated luxury apparel
            </p>
          </div>
        </nav>
      </div>
    )}
    </>
  );
}
