import api from '@/lib/axios';
import { User } from '@/types';
import Cookies from 'js-cookie';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/login', credentials);
    const { token, refreshToken, user } = response.data;
    
    // Set the token cookie
    Cookies.set('token', token, { 
      expires: 7, // 7 days
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/register', data);
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response = await api.post<{ token: string }>('/refresh', { refreshToken });
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/logout');
    // Remove the token cookie
    Cookies.remove('token', { path: '/' });
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>('/profile');
    return response.data;
  },
};

export default authService; 