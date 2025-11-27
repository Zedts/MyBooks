import { StockStatus } from '../types/book';

/**
 * Get stock status based on stock quantity
 * @param stock - Current stock quantity
 * @returns Stock status: 'in-stock', 'low-stock', or 'out-of-stock'
 */
export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) {
    return 'out-of-stock';
  }
  if (stock >= 1 && stock <= 10) {
    return 'low-stock';
  }
  return 'in-stock';
}

/**
 * Get stock status label text
 * @param stock - Current stock quantity
 * @returns Human-readable status label
 */
export function getStockStatusLabel(stock: number): string {
  const status = getStockStatus(stock);
  const labels: Record<StockStatus, string> = {
    'in-stock': 'In Stock',
    'low-stock': `Only ${stock} left`,
    'out-of-stock': 'Out of Stock',
  };
  return labels[status];
}

/**
 * Get Tailwind CSS classes for stock status badge
 * @param stock - Current stock quantity
 * @returns CSS classes string for styling
 */
export function getStockStatusClasses(stock: number): string {
  const status = getStockStatus(stock);
  const classes: Record<StockStatus, string> = {
    'in-stock': 'bg-green-500/20 text-green-400 border-green-500/30',
    'low-stock': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'out-of-stock': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };
  return classes[status];
}

/**
 * Check if book is available for purchase
 * @param stock - Current stock quantity
 * @returns True if stock > 0
 */
export function isAvailable(stock: number): boolean {
  return stock > 0;
}
