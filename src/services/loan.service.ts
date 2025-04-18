import api from '@/lib/axios';
import { Loan } from '@/types';

const loanService = {
  async getLoans(): Promise<Loan[]> {
    const response = await api.get<Loan[]>('/loans');
    return response.data;
  },

  async getLoan(id: string): Promise<Loan> {
    const response = await api.get<Loan>(`/loans/${id}`);
    return response.data;
  },

  async createLoan(loan: Omit<Loan, 'id'>): Promise<Loan> {
    const response = await api.post<Loan>('/loans', loan);
    return response.data;
  },

  async updateLoan(id: string, loan: Partial<Loan>): Promise<Loan> {
    const response = await api.put<Loan>(`/loans/${id}`, loan);
    return response.data;
  },

  async deleteLoan(id: string): Promise<void> {
    await api.delete(`/loans/${id}`);
  },

  async updateLoanStatus(id: string, status: Loan['status']): Promise<Loan> {
    const response = await api.patch<Loan>(`/loans/${id}/status`, { status });
    return response.data;
  },

  async getLoanPayments(id: string): Promise<Loan['payments']> {
    const response = await api.get<Loan['payments']>(`/loans/${id}/payments`);
    return response.data;
  },

  async createLoanPayment(id: string, payment: Omit<Loan['payments'][0], 'id'>): Promise<Loan['payments'][0]> {
    const response = await api.post<Loan['payments'][0]>(`/loans/${id}/payments`, payment);
    return response.data;
  },
};

export default loanService; 