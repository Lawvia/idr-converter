export interface ExchangeRates {
  [key: string]: number;
}

export interface CurrencyData {
  timestamp: number;
  rates: ExchangeRates;
}

export type CurrencyCode = 'IDR' | 'MYR' | 'THB' | 'USD' | 'SGD' | 'GBP' | 'EUR';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  IDR: 'Rp',
  MYR: 'RM',
  THB: '฿',
  USD: '$',
  SGD: 'S$',
  GBP: '£',
  EUR: '€',
};