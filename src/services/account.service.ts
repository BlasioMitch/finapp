import api from '@/lib/axios';
import { Account } from '@/types';

const accountService = {
  async getAccounts(): Promise<Account[]> {
    const response = await api.get<Account[]>('/accounts');
    return response.data;
  },

  async getAccount(id: string): Promise<Account> {
    const response = await api.get<Account>(`/accounts/${id}`);
    return response.data;
  },

  async createAccount(account: Omit<Account, 'id'>): Promise<Account> {
    const response = await api.post<Account>('/accounts', account);
    return response.data;
  },

  async updateAccount(id: string, account: Partial<Account>): Promise<Account> {
    const response = await api.put<Account>(`/accounts/${id}`, account);
    return response.data;
  },

  async deleteAccount(id: string): Promise<void> {
    await api.delete(`/accounts/${id}`);
  },

  async updateAccountStatus(id: string, status: Account['status']): Promise<Account> {
    const response = await api.patch<Account>(`/accounts/${id}/status`, { status });
    return response.data;
  }
};

export default accountService; 