import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Member, Transaction } from '../../types/types';

interface EditTransactionModalProps {
  transaction: Transaction;
  members: Member[];
  onSave: (transaction: Transaction) => void;
  onCancel: () => void;
}

export default function EditTransactionModal({
  transaction,
  members,
  onSave,
  onCancel
}: EditTransactionModalProps) {
  const [formData, setFormData] = useState(transaction);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-100">
            {formData.transactionType === 'payment' ? 'تعديل المعاملة' : 'تعديل المصروف'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formData.transactionType === 'payment' ? (
            <>
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
            </>
          ) : (
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
          )}

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
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}