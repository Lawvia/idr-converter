import type { CurrencyData, CurrencyCode } from '../types/currency';

export function formatNumber(value: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(value);
}

export function convertCurrency(
  amount: string,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  data: CurrencyData | null
): string {
  if (!data?.rates || !amount || isNaN(Number(amount))) return '0.00';
  
  const numericAmount = Number(amount);
  
  // If the currencies are the same, return the original amount
  if (fromCurrency === toCurrency) {
    return formatNumber(numericAmount, toCurrency);
  }

  // Convert through USD as base currency
  const usdAmount = fromCurrency === 'USD' 
    ? numericAmount 
    : numericAmount / data.rates[fromCurrency];
    
  const result = usdAmount * data.rates[toCurrency];
  
  return isFinite(result) ? formatNumber(result, toCurrency) : '0.00';
}