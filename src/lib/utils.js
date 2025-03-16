import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combine classes and handle Tailwind conflicts
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format date to display format
export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Truncate text to specified length
export function truncateText(text, length = 100) {
  if (!text || text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

// Generate placeholder image URL based on text
export function getPlaceholderImage(text, size = '400x400') {
  const [width, height] = size.split('x');
  return `/api/placeholder/${width}/${height}?text=${encodeURIComponent(text)}`;
}

// Format number with commas (e.g., 1000 -> 1,000)
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Check if URL is valid
export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}