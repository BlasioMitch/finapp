export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  lastLogin: string;
  joinDate: string;
}

export interface Loan {
  id: string;
  borrower: string;
  amount: number;
  interestRate: number;
  term: number;
  status: 'active' | 'paid' | 'defaulted';
  startDate: string;
  endDate: string;
  monthlyPayment: number;
  totalInterest: number;
  remainingBalance: number;
  payments: {
    id: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
  }[];
}

export interface Transaction {
  id: string;
  accountId: string;
  accountName: string;
  type: 'loan_payment' | 'membership_fee' | 'savings_deposit' | 'account_withdraw' | 'closure_withdraw';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

export interface Account {
  id: string;
  userId: string;
  userName: string;
  type: 'savings' | 'checking' | 'loan';
  balance: number;
  status: 'active' | 'inactive' | 'closed';
  createdAt: string;
  updatedAt: string;
} 