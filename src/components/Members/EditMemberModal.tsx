import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Member } from '../../types/types';

interface EditMemberModalProps {
  member: Member;
  onSave: (member: Member) => void;
  onCancel: () => void;
}

export default function EditMemberModal({
  member,
  onSave,
  onCancel
}: EditMemberModalProps) {
  const [formData, setFormData] = useState(member);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-100">
            تعديل بيانات العضو
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

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
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}