// src/services/userService.ts
import { User } from '../types/user';
import { client } from './AuthService';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await client.get('/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
export const createUser = async (newUser: Omit<User, 'id'>): Promise<User> => {
  try {
    const response = await client.post('/api/users', newUser);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
export const updateUser = async (updatedUser: User): Promise<User> => {
  try {
    const userToSend = { ...updatedUser,
      id_empleado: updatedUser.id_empleado ?? 0, // Valor por defecto 0 si es null
    };
    const response = await client.put(`/api/users/${updatedUser.id}`, userToSend);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await client.delete(`/api/users/${userId}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};