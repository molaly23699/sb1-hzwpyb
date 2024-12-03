import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import MainDashboard from './components/Dashboard/MainDashboard';
import AddMemberForm from './components/AddMemberForm';
import PaymentForm from './components/PaymentForm';
import ExpenseForm from './components/Expenses/ExpenseForm';
import MemberStatement from './components/MemberStatement';
import UnpaidMembersReport from './components/Reports/UnpaidMembersReport';
import TransactionHistory from './components/Reports/TransactionHistory';
import MemberList from './components/Members/MemberList';
import type { Member, Payment, Statement, Expense } from './types/types';

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [fundBalance, setFundBalance] = useState(0);
  const [showAddMember, setShowAddMember] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showMemberList, setShowMemberList] = useState(false);

  const handleAddMember = (newMember: Omit<Member, 'id'>) => {
    const member: Member = {
      ...newMember,
      id: Date.now().toString(),
    };
    setMembers([...members, member]);
    setShowAddMember(false);
  };

  const handleEditMember = (updatedMember: Member) => {
    setMembers(members.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
  };

  const handleDeleteMember = (memberId: string) => {
    // First, get all payments for this member
    const memberPayments = payments.filter(p => p.memberId === memberId);
    
    // Calculate the total balance change from deleting these payments
    const balanceChange = memberPayments.reduce((total, payment) => 
      total + (payment.type === 'deposit' ? -payment.amount : payment.amount), 0
    );
    
    // Update the fund balance
    setFundBalance(prev => prev + balanceChange);
    
    // Remove all payments for this member
    setPayments(payments.filter(p => p.memberId !== memberId));
    
    // Finally, remove the member
    setMembers(members.filter(m => m.id !== memberId));
  };

  const handleAddPayment = (newPayment: Omit<Payment, 'id'>) => {
    const payment: Payment = {
      ...newPayment,
      id: Date.now().toString(),
    };
    setPayments([...payments, payment]);
    
    setMembers(members.map(member => {
      if (member.id === newPayment.memberId) {
        return {
          ...member,
          balance: member.balance + (newPayment.type === 'deposit' ? newPayment.amount : -newPayment.amount)
        };
      }
      return member;
    }));

    setFundBalance(prev => prev + (newPayment.type === 'deposit' ? newPayment.amount : -newPayment.amount));
    setShowPaymentForm(false);
  };

  const handleEditPayment = (updatedPayment: Payment) => {
    const originalPayment = payments.find(p => p.id === updatedPayment.id);
    if (!originalPayment) return;

    // Revert the original payment's effect
    setMembers(members.map(member => {
      if (member.id === originalPayment.memberId) {
        return {
          ...member,
          balance: member.balance - (originalPayment.type === 'deposit' ? originalPayment.amount : -originalPayment.amount)
        };
      }
      return member;
    }));
    setFundBalance(prev => prev - (originalPayment.type === 'deposit' ? originalPayment.amount : -originalPayment.amount));

    // Apply the updated payment's effect
    setMembers(members.map(member => {
      if (member.id === updatedPayment.memberId) {
        return {
          ...member,
          balance: member.balance + (updatedPayment.type === 'deposit' ? updatedPayment.amount : -updatedPayment.amount)
        };
      }
      return member;
    }));
    setFundBalance(prev => prev + (updatedPayment.type === 'deposit' ? updatedPayment.amount : -updatedPayment.amount));

    setPayments(payments.map(p => p.id === updatedPayment.id ? updatedPayment : p));
  };

  const handleDeletePayment = (paymentId: string) => {
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return;

    setMembers(members.map(member => {
      if (member.id === payment.memberId) {
        return {
          ...member,
          balance: member.balance - (payment.type === 'deposit' ? payment.amount : -payment.amount)
        };
      }
      return member;
    }));
    setFundBalance(prev => prev - (payment.type === 'deposit' ? payment.amount : -payment.amount));

    setPayments(payments.filter(p => p.id !== paymentId));
  };

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: Date.now().toString(),
    };
    setExpenses([...expenses, expense]);
    setFundBalance(prev => prev - newExpense.amount);
    setShowExpenseForm(false);
  };

  const handleEditExpense = (updatedExpense: Expense) => {
    const originalExpense = expenses.find(e => e.id === updatedExpense.id);
    if (!originalExpense) return;

    setFundBalance(prev => prev + originalExpense.amount - updatedExpense.amount);
    setExpenses(expenses.map(e => e.id === updatedExpense.id ? updatedExpense : e));
  };

  const handleDeleteExpense = (expenseId: string) => {
    const expense = expenses.find(e => e.id === expenseId);
    if (!expense) return;

    setFundBalance(prev => prev + expense.amount);
    setExpenses(expenses.filter(e => e.id !== expenseId));
  };

  const getStatement = (memberId: string): Statement | null => {
    const member = members.find(m => m.id === memberId);
    if (!member) return null;
    
    const memberPayments = payments.filter(p => p.memberId === memberId);
    return {
      member,
      payments: memberPayments,
      totalBalance: member.balance
    };
  };

  const mainContent = () => {
    if (showAddMember) {
      return (
        <AddMemberForm
          onSubmit={handleAddMember}
          onCancel={() => setShowAddMember(false)}
        />
      );
    }
    if (showPaymentForm) {
      return (
        <PaymentForm
          members={members}
          onSubmit={handleAddPayment}
          onCancel={() => setShowPaymentForm(false)}
        />
      );
    }
    if (showExpenseForm) {
      return (
        <ExpenseForm
          onSubmit={handleAddExpense}
          onCancel={() => setShowExpenseForm(false)}
        />
      );
    }
    if (selectedMemberId) {
      const statement = getStatement(selectedMemberId);
      if (statement) {
        return (
          <MemberStatement
            statement={statement}
            onClose={() => setSelectedMemberId(null)}
          />
        );
      }
    }
    if (showTransactionHistory) {
      return (
        <div className="space-y-6">
          <UnpaidMembersReport
            members={members}
            payments={payments}
            currentMonth={new Date().getMonth() + 1}
            currentYear={new Date().getFullYear()}
          />
          <TransactionHistory
            payments={payments}
            expenses={expenses}
            members={members}
            onEditPayment={handleEditPayment}
            onDeletePayment={handleDeletePayment}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>
      );
    }
    if (showMemberList) {
      return (
        <MemberList
          members={members}
          onAddMember={() => setShowAddMember(true)}
          onEditMember={handleEditMember}
          onDeleteMember={handleDeleteMember}
          onViewStatement={setSelectedMemberId}
        />
      );
    }
    return (
      <MainDashboard
        fundBalance={fundBalance}
        memberCount={members.length}
        onUpdateBalance={setFundBalance}
        onAddMember={() => setShowAddMember(true)}
        onAddPayment={() => setShowPaymentForm(true)}
        onAddExpense={() => setShowExpenseForm(true)}
        onViewTransactions={() => setShowTransactionHistory(true)}
        onViewMembers={() => setShowMemberList(true)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Sidebar
        members={members}
        onSelectMember={setSelectedMemberId}
        onHome={() => {
          setSelectedMemberId(null);
          setShowAddMember(false);
          setShowPaymentForm(false);
          setShowExpenseForm(false);
          setShowTransactionHistory(false);
          setShowMemberList(false);
        }}
        selectedMemberId={selectedMemberId}
      />
      <div className="mr-64 p-8">
        {mainContent()}
      </div>
    </div>
  );
}

export default App;