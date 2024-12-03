import React from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function DateDisplay() {
  const today = new Date();
  const formattedDate = format(today, 'EEEE، d MMMM yyyy', { locale: ar });

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
      <div>
        <h3 className="text-gray-400 text-sm">التاريخ</h3>
        <p className="text-white font-bold">{formattedDate}</p>
      </div>
      <Calendar className="h-8 w-8 text-indigo-400" />
    </div>
  );
}