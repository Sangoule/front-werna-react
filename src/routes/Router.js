import { lazy,React } from "react";
import { Navigate } from "react-router-dom";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Predictions from "../views/Dashboards/Admin/prediction";

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
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
/*****Routes******/


const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: <Home /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/dossier", exact: true, element: <Dossier /> },
      { path: "/medecins", exact: true, element: <Medecin /> },
      { path: "/patients", exact: true, element: <Patients /> },
      { path: "/prediction", exact: true, element: <Prediction /> },
      { path: "/resultats", exact: true, element: <Resultats /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout/>,
    children: [
      {path : 'login', element: <Login/>},
      {path : 'register', element: <Register/>}

    ]
  },
  {
    path: "/predictions",
    element: <Predictions />,
  }
];

export default ThemeRoutes;
