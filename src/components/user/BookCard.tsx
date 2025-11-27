'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { BookWithCategory } from '@/src/types/book';
import { formatRupiah } from '@/src/utils/currency';
import { getStockStatus, getStockStatusLabel, getStockStatusClasses } from '@/src/utils/stock';
import { Button } from '../ui/Button';

interface BookCardProps {
  book: BookWithCategory;
  onAddToCart: (book: BookWithCategory) => void;
  onToggleWishlist: (bookId: number) => void;
  isInWishlist: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}) => {
  const stockStatus = getStockStatus(book.stock);
  const isAvailable = stockStatus !== 'out-of-stock';

  // Category color mapping (same as dashboard.tsx)
  const getCategoryGradient = (slug: string) => {
    const gradients: Record<string, string> = {
      design: 'from-indigo-500/20 to-purple-500/20',
      technology: 'from-emerald-500/20 to-teal-500/20',
      philosophy: 'from-orange-500/20 to-red-500/20',
    };
    return gradients[slug] || 'from-pink-500/20 to-rose-500/20';
  };

  return (
    <div className="group glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer relative">
      {/* Cover Image */}
      <div className={`relative h-80 bg-linear-to-br ${getCategoryGradient(book.category.slug)} overflow-hidden`}>
        {book.cover_image && (
          <Image
            src={book.cover_image}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">
          {book.category.name}
        </div>

        {/* Stock Status Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 backdrop-blur-sm rounded-full text-xs font-medium border ${getStockStatusClasses(book.stock)}`}>
          {getStockStatusLabel(book.stock)}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(book.id);
          }}
          className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors"
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-white'}`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-neutral-400 mb-3">{book.author}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-white">{Number(book.rating_average).toFixed(1)}</span>
          <span className="text-xs text-neutral-500">({book.rating_count})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-white">{formatRupiah(Number(book.price))}</span>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="primary"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(book);
          }}
          disabled={!isAvailable}
          className="w-full"
        >
          <ShoppingCart className="w-4 h-4" />
          {isAvailable ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};
