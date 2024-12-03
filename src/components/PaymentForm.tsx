import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import type { Payment, Member } from '../types/types';

interface PaymentFormProps {
  members: Member[];
  onSubmit: (payment: Omit<Payment, 'id'>) => void;
  onCancel: () => void;
}

export default function PaymentForm({ members, onSubmit, onCancel }: PaymentFormProps) {
  const currentDate = new Date();
  const [formData, setFormData] = useState({
    memberId: members.length > 0 ? members[0].id : '',
    amount: 0,
    type: 'deposit',
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear()
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
        <CreditCard className="h-6 w-6" />
        تسجيل معاملة مالية
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">العضو</label>
          <select
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            value={formData.memberId}
            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
          >
            {members.map(member => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">نوع المعاملة</label>
          <select
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'deposit' | 'withdrawal' })}
          >
            <option value="deposit">إيداع</option>
            <option value="withdrawal">سحب</option>
          </select>
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
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">الشهر</label>
            <input
              type="number"
              min="1"
              max="12"
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: Number(e.target.value) })}
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">السنة</label>
            <input
              type="number"
              required
              min="2024"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
            />
          </div>
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
            تسجيل المعاملة
          </button>
        </div>
      </form>
    </div>
  );
}