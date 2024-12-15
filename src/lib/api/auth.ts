import axios from 'axios';
import type { LoginCredentials, RegisterCredentials } from '@/types/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export async function register(credentials: RegisterCredentials) {
  try {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error.message);
    throw {
      message: error.response?.data?.message || 'Registration failed',
      status: error.response?.status
    };
  }
}

export async function login(credentials: LoginCredentials) {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw {
      message: error.response?.data?.message || 'Login failed',
      status: error.response?.status
    };
  }
}