import { useState, useEffect } from 'react';
import { BookWithCategory, FeaturedBook, BookFilters } from '../types/book';
import { bookService } from '../services/bookService';

export const useBooks = (initialFilters?: BookFilters) => {
  const [books, setBooks] = useState<BookWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<BookFilters>(initialFilters || {});

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    
    const response = await bookService.getBooks(filters);
    
    if (response.success && response.data) {
      setBooks(response.data);
    } else {
      setError(response.error || 'Failed to fetch books');
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category, filters.search, filters.sortBy]);

  const updateFilters = (newFilters: Partial<BookFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const refetch = () => {
    fetchBooks();
  };

  return {
    books,
    isLoading,
    error,
    filters,
    updateFilters,
    refetch,
  };
};

export const useFeaturedBooks = () => {
  const [featuredBooks, setFeaturedBooks] = useState<FeaturedBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      const response = await bookService.getFeaturedBooks();
      
      if (response.success && response.data) {
        setFeaturedBooks(response.data);
      } else {
        setError(response.error || 'Failed to fetch featured books');
      }
      
      setIsLoading(false);
    };

    fetchFeaturedBooks();
  }, []);

  return { featuredBooks, isLoading, error };
};
