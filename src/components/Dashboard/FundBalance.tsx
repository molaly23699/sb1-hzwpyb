import React, { useState } from 'react';
import { Wallet, Edit2 } from 'lucide-react';

interface FundBalanceProps {
  balance: number;
  onUpdateBalance: (newBalance: number) => void;
}

export default function FundBalance({ balance, onUpdateBalance }: FundBalanceProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBalance, setNewBalance] = useState(balance);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBalance(newBalance);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">الرصيد الجديد</label>
            <input
              type="number"
              value={newBalance}
              onChange={(e) => setNewBalance(Number(e.target.value))}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-400 hover:text-gray-200"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-200">رصيد الصندوق</h3>
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-gray-200"
        >
          <Edit2 className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Wallet className="h-8 w-8 text-indigo-400" />
        <p className="text-3xl font-bold text-white">{balance} ج.م</p>
      </div>
    </div>
  );
}