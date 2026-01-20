import { useSearchParams } from 'react-router-dom';

export const useSearchQueryParams = () => {
  const [, setSearch] = useSearchParams();

  const createSearch = (updates: Record<string, string | null | undefined>) => {
    setSearch((prev) => {
      const currentParams = new URLSearchParams(prev);

      for (const [key, value] of Object.entries(updates)) {
        if (value == null || value === '') {
          currentParams.delete(key);
        } else {
          currentParams.set(key, value);
        }
      }

      return currentParams;
    });
  };

  const getSearchData = (excludeParams?: string[]) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (excludeParams) {
      excludeParams.forEach((param) => searchParams.delete(param));
    }
    return Object.fromEntries(searchParams.entries());
  };

  return { createSearch, getSearchData };
};
