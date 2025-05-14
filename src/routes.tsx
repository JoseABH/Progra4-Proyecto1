import RootLayout from "./components/RootLayout";
import { UserDashboard } from "./components/UserDashboard";
import GestionEmpleadosPage from "./pages/GestionEmpleadosPage";
import GestionPermisosPage from "./pages/GestionPermisosPage";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";
import NuevaSolicitudPage from "./pages/NuevaSolicitudPage";
import SolicitudesPage from "./pages/SolicitudPage"
import UserPage from "./pages/UserPage";
import { createRootRoute, createRoute, createRouter, createBrowserHistory } from "@tanstack/react-router";


const rootRoute = createRootRoute({
    component: RootLayout,
})

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: UserDashboard,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginPage,
});

const solicitudesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/solicitudes",
    component: SolicitudesPage,
});

const GestionEmpleadosRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/GestionEmpleados",
    component: GestionEmpleadosPage,
});

const gestionSolicitudesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/GestionSolicitudes",
    component: GestionPermisosPage,
});
const crearSolicitudesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/CrearSolicitudes",
    component: NuevaSolicitudPage,
});
const userRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/GestionUsers",
    component: UserPage,
});




rootRoute.addChildren([
    homeRoute,
    loginRoute,
    GestionEmpleadosRoute,    
    solicitudesRoute,
    gestionSolicitudesRoute,
    crearSolicitudesRoute,
   
    userRoute

])

const router = createRouter({
    routeTree: rootRoute,
    history: createBrowserHistory(),
    defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;
