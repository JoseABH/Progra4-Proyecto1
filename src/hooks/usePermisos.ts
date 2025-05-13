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

  const addPermiso = (nuevo: Omit<Permiso, "id">) => {
    const nuevoConId: Permiso = {
      id: Date.now(),
      solicitadoEn: new Date().toISOString(),
      ...nuevo,
    };
    const nuevos = [...permisos, nuevoConId];
    setPermisos(nuevos);
    permisoService.updateAll(nuevos);
  };

  const updatePermiso = (id: number, actualizado: Permiso) => {
    const nuevos = permisos.map((p) => (p.id === id ? actualizado : p));
    setPermisos(nuevos);
    permisoService.updateAll(nuevos);
  };

  const deletePermiso = (id: number) => {
    const nuevos = permisos.filter((p) => p.id !== id);
    setPermisos(nuevos);
    permisoService.updateAll(nuevos);
  };

  return { permisos, loading, addPermiso, updatePermiso, deletePermiso };
}
