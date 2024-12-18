import { useState, useEffect } from 'react';
import type { CurrencyData } from '../types/currency';
import { API_CONFIG } from '../constants/config';

export function useCurrencyData() {
  const [data, setData] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const cachedData = localStorage.getItem(API_CONFIG.CACHE_KEY);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          if (Date.now() - parsed.timestamp < API_CONFIG.CACHE_DURATION) {
            setData(parsed);
            setLoading(false);
            return;
          }
        }

        if (!navigator.onLine) {
          if (cachedData) {
            setData(JSON.parse(cachedData));
          } else {
            setError('No cached data available offline');
          }
          setLoading(false);
          return;
        }

        const response = await fetch(API_CONFIG.BASE_URL);
        
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }

        const result = await response.json();
        const currencyData: CurrencyData = {
          timestamp: Date.now(),
          rates: result.conversion_rates, // Updated to match ExchangeRate API response
        };

        localStorage.setItem(API_CONFIG.CACHE_KEY, JSON.stringify(currencyData));
        setData(currencyData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    const interval = setInterval(fetchData, 60000); // Refresh every minute when online
    window.addEventListener('online', fetchData);
    window.addEventListener('offline', fetchData);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', fetchData);
      window.removeEventListener('offline', fetchData);
    };
  }, []);

  return { data, loading, error };
}