import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type SearchContextValue = {
  searchQuery: string;
  isSearchOpen: boolean;
  setSearchQuery: (query: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
  clearSearch: () => void;
  resetSearch: () => void;
  /** Call before navigating to /shop from another page — drawer opens once Shop loads */
  requestSearchOnShop: () => void;
  consumePendingShopOpen: () => boolean;
  hasPendingShopOpen: () => boolean;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pendingShopOpenRef = useRef(false);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const clearSearch = useCallback(() => setSearchQuery(''), []);

  const resetSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearchOpen(false);
    pendingShopOpenRef.current = false;
  }, []);

  const requestSearchOnShop = useCallback(() => {
    setSearchQuery('');
    setIsSearchOpen(false);
    pendingShopOpenRef.current = true;
  }, []);

  const consumePendingShopOpen = useCallback(() => {
    if (!pendingShopOpenRef.current) return false;
    pendingShopOpenRef.current = false;
    setIsSearchOpen(true);
    return true;
  }, []);

  const hasPendingShopOpen = useCallback(() => pendingShopOpenRef.current, []);

  const value = useMemo(
    () => ({
      searchQuery,
      isSearchOpen,
      setSearchQuery,
      openSearch,
      closeSearch,
      clearSearch,
      resetSearch,
      requestSearchOnShop,
      consumePendingShopOpen,
      hasPendingShopOpen,
    }),
    [
      searchQuery,
      isSearchOpen,
      openSearch,
      closeSearch,
      clearSearch,
      resetSearch,
      requestSearchOnShop,
      consumePendingShopOpen,
      hasPendingShopOpen,
    ],
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
