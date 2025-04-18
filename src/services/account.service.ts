import { Account } from '@/types';

class AccountService {
  private baseUrl = '/api/accounts';

  async getAccounts(): Promise<Account[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch accounts');
    }
    return response.json();
  }

  async getAccount(id: string): Promise<Account> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch account');
    }
    return response.json();
  }

  async createAccount(account: Omit<Account, 'id'>): Promise<Account> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    });
    if (!response.ok) {
      throw new Error('Failed to create account');
    }
    return response.json();
  }

  async updateAccount(id: string, account: Partial<Account>): Promise<Account> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    });
    if (!response.ok) {
      throw new Error('Failed to update account');
    }
    return response.json();
  }

  async deleteAccount(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete account');
    }
  }

  async updateAccountStatus(id: string, status: Account['status']): Promise<Account> {
    const response = await fetch(`${this.baseUrl}/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update account status');
    }
    return response.json();
  }
}

export default new AccountService(); 