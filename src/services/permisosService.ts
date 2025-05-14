import axios from "axios";
import { Permiso } from "../types/Permiso";

const BIN_ID = "6821b5c38561e97a5012389d";
const API_KEY = "$2a$10$KHn5s3ay7y6RArBSwJ9kleTQB7fCoIMFRFgjN.9ZHClcgNCrqgN8e";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const headers = {
  "Content-Type": "application/json",
  "X-Access-Key": API_KEY,
};

export const permisoService = {
  async getAll(): Promise<Permiso[]> {
    const res = await axios.get(`${BASE_URL}/latest`, { headers });
    return res.data.record;
  },

  async updateAll(data: Permiso[]) {
    return axios.put(BASE_URL, data, { headers });
  },

  /** Nuevo método: obtiene solo los permisos con el estadoProceso especificado */
  async getByEstadoProceso(estado: string): Promise<Permiso[]> {
    const todos = await this.getAll();
    return todos.filter((permiso) => permiso.estadoProceso === estado);
  },
};
