import axios from 'axios';
import { User } from '../types/user';
const BIN = '6821d6798960c979a597e056';
const USERS_API_URL = `https://api.jsonbin.io/v3/b/${BIN}`;
const API_KEY = '$2a$10$/QleYdFWb/9K4gXxgb7Q8ezciNlUu8KD97Le3g1LEPaFucalVccQe';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(USERS_API_URL, {
      headers: {
        'X-Access-Key': API_KEY,
      },
    });
    const data = response.data?.record;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const createUser = async (newUser: Omit<User, 'id'>) => {
  try {
    const users = await fetchUsers();
    const newId = users.length > 0 ? Math.max(...users.map((u: User) => u.id)) + 1 : 1;
    const userToAdd = { ...newUser, id: newId };
    const response = await axios.put(
      USERS_API_URL,
      [...users, userToAdd],
      {
        headers: {
          'X-Access-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.record;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (updatedUser: User) => {
  try {
    const users = await fetchUsers();
    const updatedUsers = users.map((user: User) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    const response = await axios.put(
      USERS_API_URL,
      updatedUsers,
      {
        headers: {
          'X-Access-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.record;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const users = await fetchUsers();
    const updatedUsers = users.filter((user: User) => user.id !== userId);
    const response = await axios.put(
      USERS_API_URL,
      updatedUsers,
      {
        headers: {
          'X-Access-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.record;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};