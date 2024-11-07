// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import avec accolades pour jwtDecode

const PrivateRoute = () => {
  // Vérifie s'il y a un utilisateur dans localStorage
  let userData = JSON.parse(localStorage.getItem('user'));

  if (!userData) {
    // Si les données utilisateur ne sont pas dans localStorage, essaie de récupérer le token depuis les cookies
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='))
      ?.split('=')[1];
  
    if (token) {
      // Décode le token pour obtenir les informations utilisateur et ajouter l'access_token
      const decodedUserData = jwtDecode(token);
      const fullUserData = { ...decodedUserData, access_token: token }; // Crée un objet complet avec le token
      // Stocke les données utilisateur complètes dans localStorage
      localStorage.setItem('user', JSON.stringify(fullUserData));
    } else {
      // Redirige vers la page de connexion si aucun token n'est trouvé
      return <Navigate to="/auth/login" />;
    }
  }
  

  // Affiche les composants enfants si authentifié
  return <Outlet />;
};

export default PrivateRoute;
