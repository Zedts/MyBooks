'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ChevronRight } from 'lucide-react';
import { FeaturedBook } from '@/src/types/book';
import { formatRupiah } from '@/src/utils/currency';

interface FeaturedCarouselProps {
  books: FeaturedBook[];
  onBookClick?: (book: FeaturedBook) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  books,
  onBookClick,
}) => {
  if (books.length === 0) {
    return null;
  }

  // Category color mapping
  const getCategoryGradient = (slug: string) => {
    const gradients: Record<string, string> = {
      design: 'from-indigo-500/20 to-purple-500/20',
      technology: 'from-emerald-500/20 to-teal-500/20',
      philosophy: 'from-orange-500/20 to-red-500/20',
    };
    return gradients[slug] || 'from-pink-500/20 to-rose-500/20';
  };

  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Featured Collection</h2>
        <p className="text-neutral-400">Handpicked for the curious mind</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.slice(0, 6).map((book) => (
          <div
            key={book.id}
            onClick={() => onBookClick?.(book)}
            className="group glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <div className={`relative h-64 bg-linear-to-br ${getCategoryGradient(book.category.slug)} overflow-hidden`}>
              {book.cover_image && (
                <Image
                  src={book.cover_image}
                  alt={book.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              )}
              <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">
                {book.category.name}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                {book.title}
              </h3>
              <p className="text-sm text-neutral-400 mb-3">{book.author}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-white">{book.rating_average.toFixed(1)}</span>
                </div>
                <span className="text-sm font-bold text-white">{formatRupiah(Number(book.price))}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-neutral-500">Bestseller</span>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
