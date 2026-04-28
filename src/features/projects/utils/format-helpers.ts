/**
 * Format Helpers
 * 
 * Utility functions for formatting currency and file sizes
 * These are pure helper functions with no dependencies on mock data
 */

/**
 * Formats a number as USD currency
 * 
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "$1,234.56")
 * 
 * @example
 * formatCurrency(1234.56) // "$1,234.56"
 * formatCurrency(0) // "$0.00"
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats file size in bytes to human-readable format
 * 
 * @param bytes - The file size in bytes
 * @returns Formatted file size string (e.g., "1.5 MB")
 * 
 * @example
 * formatFileSize(1024) // "1 KB"
 * formatFileSize(1048576) // "1 MB"
 * formatFileSize(0) // "0 Bytes"
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};
