import { lazy,React } from "react";
import { Navigate } from "react-router-dom";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";


/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Home = lazy(() => import("../views/Home.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Dossier = lazy(() => import("../views/ui/Dossier"));
const Medecin = lazy(() => import("../views/ui/Medecins"));
const Patients = lazy(() => import("../views/ui/Patients"));
const Prediction = lazy(() => import("../views/ui/Prediction"));
const Resultats = lazy(() => import("../views/ui/Resultats"));
const Forms = lazy(() => import("../views/ui/LogsViewer"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const Fichiers = lazy(() => import("../views/ui/Fichiers"));
const RequestResetPassword = lazy(() => import("../views/auth/RequestResetPassword"));
const PrivateRoute = lazy(() => import("../views/ui/PrivateRoute"));
/*****Routes******/


const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/auth/login" /> },

      // Routes protégées par PrivateRoute
      {
        element: <PrivateRoute />, // Utilise PrivateRoute pour encapsuler les routes sensibles
        children: [
          { path: "/home", exact: true, element: <Home /> },
          { path: "/about", exact: true, element: <About /> },
          { path: "/alerts", exact: true, element: <Alerts /> },
          { path: "/dossier", exact: true, element: <Dossier /> },
          { path: "/medecins", exact: true, element: <Medecin /> },
          { path: "/patients", exact: true, element: <Patients /> },
          { path: "/users/managements/", exact: true, element: <Prediction /> },
          { path: "/resultats", exact: true, element: <Resultats /> },
          { path: "/logs", exact: true, element: <Forms /> },
          { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
          { path: "/fichiers/:dossierId", exact: true, element: <Fichiers /> },
        ],
      },
      
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: [
      {path : 'login', element: <Login/>},
      {path : 'register', element: <Register/>},
      { path : "/auth/forgot-password/", element: <RequestResetPassword/>},
    ]
  }
];

export default ThemeRoutes;
