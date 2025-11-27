'use client';

import React, { useState, useEffect } from 'react';
import { UserHeader } from '@/src/components/user/UserHeader';
import { FeaturedCarousel } from '@/src/components/user/FeaturedCarousel';
import { CategoryFilter } from '@/src/components/user/CategoryFilter';
import { BookGrid } from '@/src/components/user/BookGrid';
import { useBooks, useFeaturedBooks } from '@/src/hooks/useBooks';
import { useCart } from '@/src/hooks/useCart';
import { useWishlist } from '@/src/hooks/useWishlist';
import { BookWithCategory } from '@/src/types/book';
import { showToast } from '@/src/utils/toast';

export default function UserHome() {
  const [categories, setCategories] = useState<Array<{ id: number; name: string; slug: string }>>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const { books, isLoading: isBooksLoading, updateFilters } = useBooks();
  const { featuredBooks, isLoading: isFeaturedLoading } = useFeaturedBooks();
  const { cart, addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category filter change
  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    updateFilters({ category: slug === 'all' ? undefined : slug });
  };

  // Handle search
  const handleSearch = (query: string) => {
    updateFilters({ search: query });
  };

  // Handle add to cart
  const handleAddToCart = (book: BookWithCategory) => {
    addToCart({
      bookId: book.id,
      title: book.title,
      author: book.author,
      price: Number(book.price),
      coverImage: book.cover_image,
      stock: book.stock,
    });
  };

  // Handle toggle wishlist
  const handleToggleWishlist = (bookId: number) => {
    toggleWishlist(bookId);
  };

  // Get wishlist book IDs as Set
  const wishlistBookIds = new Set(
    books.filter((book) => isInWishlist(book.id)).map((book) => book.id)
  );

  return (
    <div className="relative antialiased selection:bg-white selection:text-black overflow-x-hidden text-neutral-200 bg-neutral-950 min-h-screen">
      {/* Background Image */}
      <div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/9ebb2efd-59e4-4b29-b860-3694c884d382_3840w.webp")',
          filter: 'blur(40px)',
          maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
          zIndex: 0,
        }}
      />

      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-fuchsia-900/10 rounded-full blur-[120px] opacity-40" />
      </div>

      {/* Header */}
      <UserHeader
        cartItemsCount={cart.totalItems}
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <main className="relative pt-24 pb-16" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured Carousel */}
          {!isFeaturedLoading && featuredBooks.length > 0 && (
            <FeaturedCarousel
              books={featuredBooks}
              onBookClick={(book) => showToast.info(`View details for ${book.title}`)}
            />
          )}

          {/* Category Filter & Books Grid */}
          <div className="mt-12">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Just For You</h2>
                <p className="text-neutral-400">Explore our curated collection</p>
              </div>
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Loading State */}
            {isBooksLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              <BookGrid
                books={books}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistBookIds={wishlistBookIds}
                emptyMessage="No books found. Try different filters."
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
