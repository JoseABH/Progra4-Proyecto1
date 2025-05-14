export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'Usuario Comun' | 'Jefe de Departamento' | 'Jefe de RRHH';
  id_empleado?: number; 
}

