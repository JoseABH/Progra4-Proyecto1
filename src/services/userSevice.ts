// src/services/userService.ts
import axios from 'axios';
import { User } from '../types/user';

const API_URL = 'https://localhost:7147/api/users';

// Configuración básica de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>('');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error al cargar los usuarios');
  }
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  try {
    const response = await api.post<User>('', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Error al crear el usuario');
  }
};

export const updateUser = async (user: User): Promise<User> => {
  try {
    const response = await api.put<User>(`/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Error al actualizar el usuario');
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await api.delete(`/${userId}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error al eliminar el usuario');
  }
};