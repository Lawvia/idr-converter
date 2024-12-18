import React, { useState, useEffect } from 'react';
import { CurrencyInput } from './components/CurrencyInput';
import { ThemeToggle } from './components/ThemeToggle';
import { OnlineStatus } from './components/OnlineStatus';
import { useCurrencyData } from './hooks/useCurrencyData';
import { useTheme } from './hooks/useTheme';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { convertCurrency } from './utils/currencyUtils';
import type { CurrencyCode } from './types/currency';

export function App() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('IDR');
  const { isDark, setIsDark } = useTheme();
  const { data, loading, error } = useCurrencyData();
  const isOnline = useOnlineStatus();

  const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency, data);

  // Update document theme color based on current theme
  useEffect(() => {
    const themeColor = isDark ? '#0f172a' : '#ffffff';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="mx-auto max-w-md px-4 py-12">
        <div className={`rounded-xl p-6 shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="mb-6 flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Currency Converter
            </h1>
            <div className="flex gap-2">
              <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
              <OnlineStatus isOnline={isOnline} />
            </div>
          </div>

          {error ? (
            <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-100">
              {error}
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <CurrencyInput
                label="From"
                value={amount}
                currency={fromCurrency}
                onChange={setAmount}
                onCurrencyChange={setFromCurrency}
              />
              <CurrencyInput
                label="To"
                value={convertedAmount}
                currency={toCurrency}
                onChange={() => {}}
                onCurrencyChange={setToCurrency}
                readOnly
              />
              
              <div className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {isOnline ? (
                  'Using real-time exchange rates'
                ) : (
                  'Using cached exchange rates (offline mode)'
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;