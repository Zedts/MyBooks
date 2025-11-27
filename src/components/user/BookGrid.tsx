'use client';

import React from 'react';
import { BookWithCategory } from '@/src/types/book';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: BookWithCategory[];
  onAddToCart: (book: BookWithCategory) => void;
  onToggleWishlist: (bookId: number) => void;
  wishlistBookIds: Set<number>;
  emptyMessage?: string;
}

export const BookGrid: React.FC<BookGridProps> = ({
  books,
  onAddToCart,
  onToggleWishlist,
  wishlistBookIds,
  emptyMessage = 'No books found',
}) => {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-neutral-400 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={wishlistBookIds.has(book.id)}
        />
      ))}
    </div>
  );
};
