import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface DecodedToken {
  // Define aquí las propiedades que esperas del JWT
  sub: string;
  id: string;
  email: string;
  role:string;
  exp: number;
  iat: number;
  // Puedes agregar más según tu JWT
}

export const client = axios.create({
  baseURL: 'https://localhost:7147',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function login(credentials: LoginCredentials): Promise<string> {
  try {
    const { data } = await client.post<LoginResponse>('/api/auth/login', credentials);
    return data.token;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}
export function decodeToken(token: string): DecodedToken {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    throw new Error('Invalid token'); // No retornamos error, lo lanzamos
  }
}
