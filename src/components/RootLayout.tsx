import { Outlet } from "@tanstack/react-router"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"
import LoginPage from "../pages/LoginPage"
import NavBar from "./NavBar"

const RootLayout = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('Login debe estar dentro de un AuthProvider')
    }
    const { user } = context



    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            {user ?
                <div>
                    <NavBar><Outlet /></NavBar> 
                </div> 
             : <LoginPage />}
        </div>
    )
}

export default RootLayout
