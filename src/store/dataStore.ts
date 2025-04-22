import { create } from 'zustand';
import { Transaction, User, Account, Loan } from '@/types';
import { userApi } from '@/services/api/userApi';
import accountService from '@/services/account.service';
import transactionService from '@/services/transaction.service';
import loanService from '@/services/loan.service';

interface DataState {
  // Users
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  createUser: (userData: Omit<User, 'id' | 'lastLogin' | 'joinDate'>) => Promise<void>;
  updateUser: (id: string, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
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

export const useDataStore = create<DataState>((set, get) => ({
  // Users
  users: [],
  loading: false,
  error: null,
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await userApi.getUsers();
      set({ users, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch users', loading: false });
    }
  },
  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const newUser = await userApi.createUser(userData);
      set((state) => ({ users: [...state.users, newUser], loading: false }));
    } catch (error) {
      set({ error: 'Failed to create user', loading: false });
    }
  },
  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const updatedUser = await userApi.updateUser(id, userData);
      set((state) => ({
        users: state.users.map((user) => (user.id === id ? updatedUser : user)),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update user', loading: false });
    }
  },
  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await userApi.deleteUser(id);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete user', loading: false });
    }
  },
  setUsers: (users) => set({ users }),

  // Transactions
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
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
    set((state) => ({ accounts: [...state.accounts, account] })),
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
  addLoan: (loan) => set((state) => ({ loans: [...state.loans, loan] })),
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