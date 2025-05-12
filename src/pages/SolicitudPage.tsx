import { useState } from 'react'
import {
    FiSearch,
    FiFilter,
    FiCalendar,
    FiClock,
    FiChevronDown,
} from 'react-icons/fi'

interface Solicitud {
    id: number
    tipo: 'Vacaciones' | 'Permiso'
    estado: 'Pendiente' | 'Aprobada'
    nombre: string
    inicio: string
    fin: string
    motivo: string
    comentarios?: string
    solicitadoEn: string
}

const solicitudesMock: Solicitud[] = [
    {
        id: 1,
        tipo: 'Vacaciones',
        estado: 'Pendiente',
        nombre: 'Juan Pérez',
        inicio: '2025-05-13',
        fin: '2025-05-20',
        motivo: 'Vacaciones familiares',
        solicitadoEn: '2025-05-01T04:30:00',
    },
    {
        id: 2,
        tipo: 'Permiso',
        estado: 'Aprobada',
        nombre: 'Carlos Rodríguez',
        inicio: '2025-05-08',
        fin: '2025-05-08',
        motivo: 'Cita médica',
        comentarios: 'Aprobado. Favor de presentar comprobante médico al regresar.',
        solicitadoEn: '2025-04-28T08:15:00',
    },
]

function formatearRango(inicio: string, fin: string) {
    const opts = { day: '2-digit', month: 'long' } as const;
    const i = new Date(inicio).toLocaleDateString('es-ES', opts);
    const f = new Date(fin).toLocaleDateString('es-ES', opts);
    return `${i} - ${f}`;
}

function formatearTimestamp(dt: string) {
    const d = new Date(dt);
    const fecha = d.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const hora = d.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return `Solicitado: ${fecha} ${hora}`;
}

export default function GestorSolicitudes() {
    const [busqueda, setBusqueda] = useState('')
    const [filtro, setFiltro] = useState<'Todas' | 'Pendiente' | 'Aprobada'>('Todas')
    const [open, setOpen] = useState(false)

    const filtradas = solicitudesMock.filter(
        (s) =>
            (s.nombre.toLowerCase().includes(busqueda) || s.tipo.toLowerCase().includes(busqueda)) &&
            (filtro === 'Todas' || s.estado === filtro)
    )

    return (
        <div className="space-y-6">
            {/* Buscador + Filtro */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar solicitudes..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center pl-3 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <FiFilter className="mr-2 text-gray-500" />
                        <span>Estado: {filtro}</span>
                        <FiChevronDown className="ml-2 text-gray-500" />
                    </button>
                    {open && (
                        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            {['Todas', 'Pendiente', 'Aprobada'].map((op) => (
                                <div
                                    key={op}
                                    onClick={() => {
                                        setFiltro(op as any)
                                        setOpen(false)
                                    }}
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                    {op}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Contenedor de Solicitudes */}
            <div className="border border-gray-200 rounded-lg bg-white">
                <div className="px-6 pt-6">
                    <h2 className="text-xl font-semibold">Solicitudes de Empleados</h2>
                    <p className="text-gray-500 mt-1">Gestione las solicitudes de vacaciones y permisos</p>
                </div>
                <div className="divide-y divide-gray-200">
                    {filtradas.map((s) => (
                        <div key={s.id} className="px-6 py-6 relative">
                            {/* Timestamp */}
                            <div className="absolute top-6 right-6 flex items-center text-xs text-gray-500">
                                <FiClock className="mr-1 h-3 w-3" />
                                {formatearTimestamp(s.solicitadoEn)}
                            </div>

                            {/* Título + Badge */}
                            <div className="flex items-center space-x-3">
                                <span className="font-medium text-gray-800">{s.tipo}</span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${s.estado === 'Pendiente'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}
                                >
                                    {s.estado}
                                </span>
                            </div>

                            {/* Nombre */}
                            <div className="mt-3 text-sm text-gray-800">{s.nombre}</div>

                            {/* Fecha rango */}
                            <div className="mt-2 flex items-center text-sm text-gray-600">
                                <FiCalendar className="mr-1 h-4 w-4" />
                                {formatearRango(s.inicio, s.fin)}
                            </div>

                            {/* Motivo */}
                            <div className="mt-2 text-sm text-gray-800">
                                <span className="font-medium">Motivo:</span> {s.motivo}
                            </div>

                            {/* Comentarios */}
                            {s.comentarios && (
                                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                                    <span className="font-medium">Comentarios:</span> {s.comentarios}
                                </div>
                            )}

                            {/* Botón de acción */}
                            <div className="mt-4 flex justify-end">
                                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                                    {s.comentarios ? 'Ver Detalles' : 'Revisar Solicitud'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}