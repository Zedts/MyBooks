export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  deleted_at: Date | null;
}

export interface Book {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category_id: number;
  category?: Category;
  author: string;
  publisher: string;
  isbn: string | null;
  price: number;
  stock: number;
  cover_image: string | null;
  rating_average: number;
  rating_count: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface BookWithCategory extends Book {
  category: Category;
}

export interface FeaturedBook extends BookWithCategory {
  // Featured books are just books with high ratings
}

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface BookFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'rating' | 'price-asc' | 'price-desc' | 'newest';
}
