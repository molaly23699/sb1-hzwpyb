import React from 'react';
import { AlertCircle } from 'lucide-react';
import type { Member, Payment } from '../../types/types';

interface UnpaidMembersReportProps {
  members: Member[];
  payments: Payment[];
  currentMonth: number;
  currentYear: number;
}

export default function UnpaidMembersReport({ 
  members, 
  payments, 
  currentMonth, 
  currentYear 
}: UnpaidMembersReportProps) {
  const unpaidMembers = members.filter(member => {
    const hasPaymentThisMonth = payments.some(
      payment => 
        payment.memberId === member.id && 
        payment.month === currentMonth &&
        payment.year === currentYear &&
        payment.type === 'deposit'
    );
    return !hasPaymentThisMonth;
  });

  if (unpaidMembers.length === 0) {
    return (
      <div className="bg-green-800/20 text-green-400 p-4 rounded-lg">
        جميع الأعضاء قاموا بالسداد لهذا الشهر
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-gray-200">
          الأعضاء المتأخرين عن السداد - {currentMonth}/{currentYear}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-right text-gray-300">الاسم</th>
              <th className="px-4 py-2 text-right text-gray-300">رقم الهاتف</th>
              <th className="px-4 py-2 text-right text-gray-300">الرصيد الحالي</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {unpaidMembers.map(member => (
              <tr key={member.id} className="hover:bg-gray-700">
                <td className="px-4 py-2 text-gray-300">{member.name}</td>
                <td className="px-4 py-2 text-gray-300">{member.phone}</td>
                <td className="px-4 py-2 text-gray-300">{member.balance} ج.م</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}