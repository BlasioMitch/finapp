import api from '@/lib/axios';
import { User } from '@/types';

const userService = {
  async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/users');
    return response.data;
  },

  async getUser(id: string): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const response = await api.post<User>('/users', user);
    return response.data;
  },

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, user);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  async updateUserStatus(id: string, status: User['status']): Promise<User> {
    const response = await api.patch<User>(`/users/${id}/status`, { status });
    return response.data;
  },

  async updateUserRole(id: string, role: User['role']): Promise<User> {
    const response = await api.patch<User>(`/users/${id}/role`, { role });
    return response.data;
  },
};

export default userService; 