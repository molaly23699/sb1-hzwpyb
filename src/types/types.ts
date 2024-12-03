export interface Member {
  id: string;
  name: string;
  phone: string;
  joinDate: string;
  balance: number;
  monthlyAmount: number;
}

export interface Payment {
  id: string;
  memberId: string;
  amount: number;
  date: string;
  type: 'deposit' | 'withdrawal';
  month?: number;
  year?: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export interface Statement {
  member: Member;
  payments: Payment[];
  totalBalance: number;
}

export type Transaction = 
  | (Payment & { transactionType: 'payment' })
  | (Expense & { transactionType: 'expense' });