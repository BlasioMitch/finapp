import { create } from 'zustand';
import { Transaction, User, Account, Loan } from '@/types';

interface DataState {
  // Users
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  setUsers: (users: User[]) => void;

  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  setTransactions: (transactions: Transaction[]) => void;

  // Accounts
  accounts: Account[];
  addAccount: (account: Account) => void;
  updateAccount: (account: Account) => void;
  deleteAccount: (id: string) => void;
  setAccounts: (accounts: Account[]) => void;

  // Loans
  loans: Loan[];
  addLoan: (loan: Loan) => void;
  updateLoan: (loan: Loan) => void;
  deleteLoan: (id: string) => void;
  setLoans: (loans: Loan[]) => void;
}

export const useDataStore = create<DataState>((set) => ({
  // Users
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (user) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
  setUsers: (users) => set({ users }),

  // Transactions
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),
  updateTransaction: (transaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === transaction.id ? transaction : t
      ),
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
  setTransactions: (transactions) => set({ transactions }),

  // Accounts
  accounts: [],
  addAccount: (account) =>
    set((state) => ({
      accounts: [...state.accounts, account],
    })),
  updateAccount: (account) =>
    set((state) => ({
      accounts: state.accounts.map((a) => (a.id === account.id ? account : a)),
    })),
  deleteAccount: (id) =>
    set((state) => ({
      accounts: state.accounts.filter((a) => a.id !== id),
    })),
  setAccounts: (accounts) => set({ accounts }),

  // Loans
  loans: [],
  addLoan: (loan) =>
    set((state) => ({
      loans: [...state.loans, loan],
    })),
  updateLoan: (loan) =>
    set((state) => ({
      loans: state.loans.map((l) => (l.id === loan.id ? loan : l)),
    })),
  deleteLoan: (id) =>
    set((state) => ({
      loans: state.loans.filter((l) => l.id !== id),
    })),
  setLoans: (loans) => set({ loans }),
})); 