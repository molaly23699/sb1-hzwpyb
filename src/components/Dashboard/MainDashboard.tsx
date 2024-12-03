import React from 'react';
import { PlusCircle, History, Receipt, Users } from 'lucide-react';
import DateDisplay from './DateDisplay';
import WeatherWidget from './WeatherWidget';
import FundBalance from './FundBalance';

interface MainDashboardProps {
  fundBalance: number;
  memberCount: number;
  onUpdateBalance: (newBalance: number) => void;
  onAddMember: () => void;
  onAddPayment: () => void;
  onAddExpense: () => void;
  onViewTransactions: () => void;
  onViewMembers: () => void;
}

export default function MainDashboard({ 
  fundBalance,
  memberCount,
  onUpdateBalance,
  onAddPayment,
  onAddExpense,
  onViewTransactions,
  onViewMembers
}: MainDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DateDisplay />
        <WeatherWidget />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FundBalance
          balance={fundBalance}
          onUpdateBalance={onUpdateBalance}
        />

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-200">عدد الأعضاء</h3>
          <p className="text-3xl font-bold text-white mt-4">{memberCount}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-200 mb-6">الإجراءات السريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={onAddPayment}
            className="flex items-center gap-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span>تسجيل قسط</span>
          </button>
          <button
            onClick={onAddExpense}
            className="flex items-center gap-2 bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Receipt className="h-5 w-5" />
            <span>تسجيل مصروف</span>
          </button>
          <button
            onClick={onViewTransactions}
            className="flex items-center gap-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <History className="h-5 w-5" />
            <span>سجل المعاملات</span>
          </button>
          <button
            onClick={onViewMembers}
            className="flex items-center gap-2 bg-yellow-600 text-white p-4 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <Users className="h-5 w-5" />
            <span>قائمة الأعضاء</span>
          </button>
        </div>
      </div>
    </div>
  );
}