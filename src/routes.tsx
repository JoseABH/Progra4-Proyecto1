import RootLayout from "./components/RootLayout";
import en from "./pages/en";
import GestionPermisosPage from "./pages/GestionPermisosPage";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";

import SolicitudesPage from "./pages/SolicitudPage"

import UserPage from "./pages/UserPage";




import { createRootRoute, createRoute, createRouter, createBrowserHistory } from "@tanstack/react-router";


const rootRoute = createRootRoute({
    component: RootLayout,
})

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomePage,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginPage,
});

const empleadosRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/en",
    component: en,
});


const solicitudesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/solicitudes",
    component: SolicitudesPage,
});

const gestionSolicitudesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/GestionSolicitudes",
    component: GestionPermisosPage,
});

const userRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/GestionUsers",
    component: UserPage,
});




rootRoute.addChildren([
    homeRoute,
    loginRoute,
    empleadosRoute,

    solicitudesRoute,
    gestionSolicitudesRoute,

    userRoute

])

const router = createRouter({
    routeTree: rootRoute,
    history: createBrowserHistory(),
    defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;
