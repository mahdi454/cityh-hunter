import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'INR'
    notation?: Intl.NumberFormatOptions['notation']
    maxFraction?:number | undefined
  } = {}
) {
  const { currency = 'USD', notation = 'compact',maxFraction=2 } = options

  const numericPrice =
    typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: maxFraction,
  }).format(numericPrice)
}