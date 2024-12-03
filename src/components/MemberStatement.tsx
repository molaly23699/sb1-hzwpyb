import React from 'react';
import { FileText } from 'lucide-react';
import type { Statement } from '../types/types';

interface MemberStatementProps {
  statement: Statement;
  onClose: () => void;
}

export default function MemberStatement({ statement, onClose }: MemberStatementProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
          <FileText className="h-6 w-6" />
          كشف حساب - {statement.member.name}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200"
        >
          إغلاق
        </button>
      </div>
      
      <div className="mb-6">
        <p className="text-lg text-gray-300">
          الرصيد الحالي: <span className="font-bold text-white">{statement.totalBalance} ج.م</span>
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-gray-300">التاريخ</th>
              <th className="px-6 py-3 text-gray-300">النوع</th>
              <th className="px-6 py-3 text-gray-300">المبلغ</th>
              <th className="px-6 py-3 text-gray-300">الشهر</th>
              <th className="px-6 py-3 text-gray-300">السنة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {statement.payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 text-gray-300">
                  {new Date(payment.date).toLocaleDateString('ar-EG')}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {payment.type === 'deposit' ? 'إيداع' : 'سحب'}
                </td>
                <td className="px-6 py-4">
                  <span className={payment.type === 'deposit' ? 'text-green-400' : 'text-red-400'}>
                    {payment.type === 'deposit' ? '+' : '-'}{payment.amount} ج.م
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">{payment.month}</td>
                <td className="px-6 py-4 text-gray-300">{payment.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}