import React from 'react';
import { Users, UserPlus, FileText } from 'lucide-react';
import type { Member } from '../types/types';

interface MemberListProps {
  members: Member[];
  onAddMember: () => void;
  onViewStatement: (memberId: string) => void;
}

export default function MemberList({ members, onAddMember, onViewStatement }: MemberListProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="h-6 w-6" />
          قائمة الأعضاء
        </h2>
        <button
          onClick={onAddMember}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
        >
          <UserPlus className="h-5 w-5" />
          إضافة عضو جديد
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-gray-600">الاسم</th>
              <th className="px-6 py-3 text-gray-600">رقم الهاتف</th>
              <th className="px-6 py-3 text-gray-600">تاريخ الانضمام</th>
              <th className="px-6 py-3 text-gray-600">الرصيد</th>
              <th className="px-6 py-3 text-gray-600">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4">{member.phone}</td>
                <td className="px-6 py-4">{member.joinDate}</td>
                <td className="px-6 py-4">{member.balance} ج.م</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onViewStatement(member.id)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <FileText className="h-4 w-4" />
                    كشف حساب
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}