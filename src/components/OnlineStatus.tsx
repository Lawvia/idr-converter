import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface OnlineStatusProps {
  isOnline: boolean;
}

export function OnlineStatus({ isOnline }: OnlineStatusProps) {
  return (
    <div className="rounded-lg p-2 text-gray-500 dark:text-gray-400">
      {isOnline ? <Wifi size={20} /> : <WifiOff size={20} />}
    </div>
  );
}