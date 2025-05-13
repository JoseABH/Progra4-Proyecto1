

import { AuthContext } from '../Context/AuthContext'
import { useContext } from 'react'
import HomePage from './HomePage'
import { useNavigate } from '@tanstack/react-router'


export default function Login() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('Login debe estar dentro de un AuthProvider')
    }
    const { user, setUser } = context
 const navigate = useNavigate()
    const handleLogin = () => {

        if (1 === 1) {
            setUser("")
            navigate({ to: '/' })

        }
    }


    return (
        <>
            {user ? <HomePage />

                : <div className=" w-screen h-screen flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-center mb-4">Prueba ejemplo</h2>
                     <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                    <div className="flex flex-col items-center space-y-4">
                        <input
                            type="email"
                            placeholder='Correo'

                            className="border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            placeholder='Contraseña'

                            className="border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={handleLogin}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-64"
                        >
                            Ingresar
                        </button>

                    </div>
                </div>
            }


        </>
    )
}