/**
 * Format number to Indonesian Rupiah currency
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "Rp 150.000")
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number to Indonesian Rupiah with separator only (no "Rp" prefix)
 * @param amount - The amount to format
 * @returns Formatted number with thousand separator (e.g., "150.000")
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(amount);
}

/**
 * Parse formatted Rupiah string back to number
 * @param rupiahString - Formatted currency string
 * @returns Number value
 */
export function parseRupiah(rupiahString: string): number {
  return parseInt(rupiahString.replace(/[^0-9]/g, ''), 10) || 0;
}
