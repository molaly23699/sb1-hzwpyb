import React, { useState } from 'react';
import { Users, UserPlus, FileText, Edit2, Trash2 } from 'lucide-react';
import EditMemberModal from './EditMemberModal';
import type { Member } from '../../types/types';

interface MemberListProps {
  members: Member[];
  onAddMember: () => void;
  onEditMember: (member: Member) => void;
  onDeleteMember: (memberId: string) => void;
  onViewStatement: (memberId: string) => void;
}

export default function MemberList({ 
  members, 
  onAddMember, 
  onEditMember,
  onDeleteMember,
  onViewStatement 
}: MemberListProps) {
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const handleEdit = (member: Member) => {
    setEditingMember(member);
  };

  const handleEditComplete = (updatedMember: Member) => {
    onEditMember(updatedMember);
    setEditingMember(null);
  };

  const handleDelete = (memberId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العضو؟')) {
      onDeleteMember(memberId);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
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
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-gray-300">الاسم</th>
              <th className="px-6 py-3 text-gray-300">رقم الهاتف</th>
              <th className="px-6 py-3 text-gray-300">تاريخ الانضمام</th>
              <th className="px-6 py-3 text-gray-300">قيمة القسط</th>
              <th className="px-6 py-3 text-gray-300">الرصيد</th>
              <th className="px-6 py-3 text-gray-300">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-300">{member.name}</td>
                <td className="px-6 py-4 text-gray-300">{member.phone}</td>
                <td className="px-6 py-4 text-gray-300">
                  {new Date(member.joinDate).toLocaleDateString('ar-EG')}
                </td>
                <td className="px-6 py-4 text-gray-300">{member.monthlyAmount} ج.م</td>
                <td className="px-6 py-4">
                  <span className={member.balance >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {member.balance} ج.م
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewStatement(member.id)}
                      className="text-blue-400 hover:text-blue-300"
                      title="كشف حساب"
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-yellow-400 hover:text-yellow-300"
                      title="تعديل"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-400 hover:text-red-300"
                      title="حذف"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingMember && (
        <EditMemberModal
          member={editingMember}
          onSave={handleEditComplete}
          onCancel={() => setEditingMember(null)}
        />
      )}
    </div>
  );
}