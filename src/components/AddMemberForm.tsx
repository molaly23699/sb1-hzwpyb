import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import type { Member } from '../types/types';

interface AddMemberFormProps {
  onSubmit: (member: Omit<Member, 'id'>) => void;
  onCancel: () => void;
}

export default function AddMemberForm({ onSubmit, onCancel }: AddMemberFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    balance: 0,
    monthlyAmount: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      joinDate: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
        <UserPlus className="h-6 w-6" />
        إضافة عضو جديد
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">الاسم</label>
          <input
            type="text"
            required
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">رقم الهاتف</label>
          <input
            type="tel"
            required
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">الرصيد الأولي</label>
          <input
            type="number"
            required
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            value={formData.balance}
            onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">قيمة القسط الشهري</label>
          <input
            type="number"
            required
            min="1"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            value={formData.monthlyAmount}
            onChange={(e) => setFormData({ ...formData, monthlyAmount: Number(e.target.value) })}
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
            إضافة
          </button>
        </div>
      </form>
    </div>
  );
}