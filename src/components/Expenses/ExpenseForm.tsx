import React, { useState } from 'react';
import { Receipt } from 'lucide-react';
import type { Expense } from '../../types/types';

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
  onCancel: () => void;
}

export default function ExpenseForm({ onSubmit, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    description: '',
    amount: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
        <Receipt className="h-6 w-6" />
        تسجيل مصروف جديد
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">الوصف</label>
          <input
            type="text"
            required
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">المبلغ</label>
          <input
            type="number"
            required
            min="1"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          />
        </div>
        
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-400 hover:text-gray-200"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            تسجيل المصروف
          </button>
        </div>
      </form>
    </div>
  );
}