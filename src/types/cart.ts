export interface CartItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  coverImage: string | null;
  stock: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CartStorage {
  items: CartItem[];
  updatedAt: string;
}
