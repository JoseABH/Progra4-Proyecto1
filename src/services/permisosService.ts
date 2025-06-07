import { Permiso } from "../types/Permiso";
import { client  } from "./AuthService";

export const permisoService = {
  async getAll(): Promise<Permiso[]> {
    const res = await client.get("/api/Permisos");
    return res.data;
  },

  async updateAll(_data: Permiso[]) {
    // No se usará porque ahora se trabaja con operaciones individuales
    console.warn("updateAll no es compatible con la nueva API");
  },

  async create(data: Omit<Permiso, "id">): Promise<Permiso> {
    const res = await client.post("/api/Permisos", data);
    return res.data;
  },

  async update(id: number, data: Permiso): Promise<void> {
    await client.put(`/api/Permisos/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await client.delete(`/api/Permisos/${id}`);
  },
};
