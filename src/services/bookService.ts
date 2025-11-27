import { BookWithCategory, FeaturedBook, BookFilters } from '../types/book';

const API_BASE_URL = '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const bookService = {
  /**
   * Fetch all books with optional filters
   */
  async getBooks(filters?: BookFilters): Promise<ApiResponse<BookWithCategory[]>> {
    try {
      const params = new URLSearchParams();
      
      if (filters?.category) params.append('category', filters.category);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.sortBy) params.append('sortBy', filters.sortBy);
      
      const response = await fetch(`${API_BASE_URL}/books?${params.toString()}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      return { success: false, error: 'Failed to fetch books' };
    }
  },

  /**
   * Fetch featured/recommended books (high ratings)
   */
  async getFeaturedBooks(): Promise<ApiResponse<FeaturedBook[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/books/featured`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured books:', error);
      return { success: false, error: 'Failed to fetch featured books' };
    }
  },

  /**
   * Fetch book by ID
   */
  async getBookById(id: number): Promise<ApiResponse<BookWithCategory>> {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching book:', error);
      return { success: false, error: 'Failed to fetch book' };
    }
  },
};

export default bookService;
