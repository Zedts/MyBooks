import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import { showToast } from '../utils/toast';

interface WishlistItem {
  id: number;
  book_id: number;
  user_id: number;
  created_at: Date;
  book: {
    id: number;
    title: string;
    author: string;
    price: number;
    cover_image: string | null;
    stock: number;
    rating_average: number;
    category: {
      name: string;
      slug: string;
    };
  };
}

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [wishlistBookIds, setWishlistBookIds] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // Fetch wishlist from API
  const fetchWishlist = useCallback(async () => {
    const token = authService.getToken();
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (data.success && data.data) {
        setWishlistItems(data.data);
        setWishlistBookIds(new Set(data.data.map((item: WishlistItem) => item.book_id)));
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // Toggle wishlist (add/remove)
  const toggleWishlist = useCallback(async (bookId: number) => {
    const token = authService.getToken();
    if (!token) {
      showToast.error('Please login to add to wishlist');
      return;
    }

    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.action === 'added') {
          showToast.success('Added to wishlist');
          wishlistBookIds.add(bookId);
        } else {
          showToast.success('Removed from wishlist');
          wishlistBookIds.delete(bookId);
        }
        setWishlistBookIds(new Set(wishlistBookIds));
        fetchWishlist(); // Refresh wishlist
      } else {
        showToast.error(data.error || 'Failed to update wishlist');
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      showToast.error('Failed to update wishlist');
    }
  }, [wishlistBookIds, fetchWishlist]);

  // Check if book is in wishlist
  const isInWishlist = useCallback((bookId: number): boolean => {
    return wishlistBookIds.has(bookId);
  }, [wishlistBookIds]);

  return {
    wishlistItems,
    isLoading,
    toggleWishlist,
    isInWishlist,
    refetch: fetchWishlist,
  };
};
