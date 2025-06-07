import { useEffect, useState } from "react";
import { Permiso } from "../types/Permiso";
import { permisoService } from "../services/permisosService";

export function usePermisos() {
  const [permisos, setPermisos] = useState<Permiso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    permisoService.getAll().then((data) => {
      setPermisos(data);
      setLoading(false);
    });
  }, []);

  const addPermiso = async (nuevo: Omit<Permiso, "id">) => {
    const creado = await permisoService.create(nuevo);
    setPermisos((prev) => [creado, ...prev]);
  };

  const updatePermiso = async (id: number, actualizado: Permiso) => {
    await permisoService.update(id, actualizado);
    setPermisos((prev) =>
      prev.map((p) => (p.id === id ? actualizado : p))
    );
  };

  const deletePermiso = async (id: number) => {
    await permisoService.delete(id);
    setPermisos((prev) => prev.filter((p) => p.id !== id));
  };

  return { permisos, loading, addPermiso, updatePermiso, deletePermiso };
}
