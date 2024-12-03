import React, { useState } from 'react';
import { History, Edit2, Trash2 } from 'lucide-react';
import EditTransactionModal from './EditTransactionModal';
import type { Payment, Member, Expense, Transaction } from '../../types/types';

interface TransactionHistoryProps {
  payments: Payment[];
  expenses: Expense[];
  members: Member[];
  onEditPayment: (payment: Payment) => void;
  onDeletePayment: (paymentId: string) => void;
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (expenseId: string) => void;
}

export default function TransactionHistory({ 
  payments, 
  expenses,
  members,
  onEditPayment,
  onDeletePayment,
  onEditExpense,
  onDeleteExpense
}: TransactionHistoryProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const getMemberName = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : 'عضو محذوف';
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleEditComplete = (updatedTransaction: Transaction) => {
    if (updatedTransaction.transactionType === 'payment') {
      const { transactionType, ...payment } = updatedTransaction;
      onEditPayment(payment);
    } else {
      const { transactionType, ...expense } = updatedTransaction;
      onEditExpense(expense);
    }
    setEditingTransaction(null);
  };

  const handleDelete = (transaction: Transaction) => {
    const message = transaction.transactionType === 'payment' 
      ? 'هل أنت متأكد من حذف هذه المعاملة؟'
      : 'هل أنت متأكد من حذف هذا المصروف؟';

    if (window.confirm(message)) {
      if (transaction.transactionType === 'payment') {
        onDeletePayment(transaction.id);
      } else {
        onDeleteExpense(transaction.id);
      }
    }
  };

  const allTransactions: Transaction[] = [
    ...payments.map(payment => ({
      ...payment,
      transactionType: 'payment' as const
    })),
    ...expenses.map(expense => ({
      ...expense,
      transactionType: 'expense' as const
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <History className="h-6 w-6 text-indigo-400" />
        <h2 className="text-xl font-semibold text-gray-200">سجل المعاملات</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-right text-gray-300">التاريخ</th>
              <th className="px-4 py-2 text-right text-gray-300">النوع</th>
              <th className="px-4 py-2 text-right text-gray-300">التفاصيل</th>
              <th className="px-4 py-2 text-right text-gray-300">المبلغ</th>
              <th className="px-4 py-2 text-right text-gray-300">الشهر/السنة</th>
              <th className="px-4 py-2 text-right text-gray-300">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {allTransactions.map(transaction => (
              <tr key={transaction.id} className="hover:bg-gray-700">
                <td className="px-4 py-2 text-gray-300">
                  {new Date(transaction.date).toLocaleDateString('ar-EG')}
                </td>
                <td className="px-4 py-2">
                  {transaction.transactionType === 'payment' ? (
                    <span className={transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'}>
                      {transaction.type === 'deposit' ? 'إيداع' : 'سحب'}
                    </span>
                  ) : (
                    <span className="text-yellow-400">مصروف</span>
                  )}
                </td>
                <td className="px-4 py-2 text-gray-300">
                  {transaction.transactionType === 'payment' 
                    ? getMemberName(transaction.memberId)
                    : transaction.description
                  }
                </td>
                <td className="px-4 py-2">
                  {transaction.transactionType === 'payment' ? (
                    <span className={transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'}>
                      {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount} ج.م
                    </span>
                  ) : (
                    <span className="text-yellow-400">
                      -{transaction.amount} ج.م
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-gray-300">
                  {transaction.transactionType === 'payment' 
                    ? `${transaction.month}/${transaction.year}`
                    : '-'
                  }
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="text-blue-400 hover:text-blue-300"
                      title="تعديل"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction)}
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

      {editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          members={members}
          onSave={handleEditComplete}
          onCancel={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
}