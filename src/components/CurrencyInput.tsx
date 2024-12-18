import React from 'react';
import type { CurrencyCode } from '../types/currency';
import { CURRENCY_SYMBOLS } from '../types/currency';

interface CurrencyInputProps {
  value: string;
  currency: CurrencyCode;
  onChange: (value: string) => void;
  onCurrencyChange: (currency: CurrencyCode) => void;
  label: string;
  readOnly?: boolean;
}

export function CurrencyInput({
  value,
  currency,
  onChange,
  onCurrencyChange,
  label,
  readOnly = false,
}: CurrencyInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ''); // Remove commas before validation
    // Allow empty string or valid numbers only
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      onChange(value);
    }
  };

  // Format display value with separators if it's a readonly field
  const displayValue = readOnly ? value : value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex gap-2">
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
          className="block w-24 rounded-lg border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
        >
          {Object.entries(CURRENCY_SYMBOLS).map(([code, symbol]) => (
            <option key={code} value={code}>
              {code} ({symbol})
            </option>
          ))}
        </select>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {CURRENCY_SYMBOLS[currency]}&nbsp;&nbsp;
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleInputChange}
            readOnly={readOnly}
            className="block w-full rounded-lg border-gray-300 bg-white pl-12 pr-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );
}