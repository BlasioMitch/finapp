import api from '@/lib/axios';
import { Transaction } from '@/types';

const transactionService = {
  async getTransactions(): Promise<Transaction[]> {
    const response = await api.get<Transaction[]>('/transactions');
    return response.data;
  },

  async getTransaction(id: string): Promise<Transaction> {
    const response = await api.get<Transaction>(`/transactions/${id}`);
    return response.data;
  },

  async createTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const response = await api.post<Transaction>('/transactions', transaction);
    return response.data;
  },

  async updateTransaction(id: string, transaction: Partial<Transaction>): Promise<Transaction> {
    const response = await api.put<Transaction>(`/transactions/${id}`, transaction);
    return response.data;
  },

  async deleteTransaction(id: string): Promise<void> {
    await api.delete(`/transactions/${id}`);
  },

  async updateTransactionStatus(id: string, status: Transaction['status']): Promise<Transaction> {
    const response = await api.patch<Transaction>(`/transactions/${id}/status`, { status });
    return response.data;
  },

  async getTransactionsByAccount(accountId: string): Promise<Transaction[]> {
    const response = await api.get<Transaction[]>(`/transactions/account/${accountId}`);
    return response.data;
  },

  async getTransactionsByType(type: Transaction['type']): Promise<Transaction[]> {
    const response = await api.get<Transaction[]>(`/transactions/type/${type}`);
    return response.data;
  },
};

export default transactionService; 