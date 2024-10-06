import React, { useState, useEffect } from "react";
import axios from "axios"; // Ou utilise fetch si tu préfères
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import CreateDossierForm from "./forms/CreateDossierForm";

const Dossier = () => {
  const [dossiers, setDossiers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Remplace l'URL par celle de ton API
    axios.get("http://localhost:8000/api/dossiers")
      .then(response => {
        setDossiers(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des dossiers :", error);
      });
  }, []);

  // Fonction pour afficher le formulaire
  const handleCreateNew = () => {
    setShowForm(true);
  };

  // Fonction pour fermer le formulaire et recharger la liste des dossiers
  const handleCloseForm = () => {
    setShowForm(false);
    // Recharger la liste des dossiers après la création
    axios.get("http://localhost:8000/api/dossiers")
      .then(response => {
        setDossiers(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des dossiers :", error);
      });
  };

  return (
    <div className="dossier-container row">
      {dossiers.map((dossier) => (
        <div key={dossier.id} className="dossier-item col-md-3">
          <FontAwesomeIcon icon={faFolder} size="6x" color="#f39c12" />
          <p>{dossier.name}</p>
        </div>
      ))}
      <div className="dossier-item col-md-3" onClick={handleCreateNew} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon={faPlusCircle} size="6x" color="#3498db" />
        <p>Nouveau Dossier</p>
      </div>
      {showForm && <CreateDossierForm onClose={handleCloseForm} />}
    </div>
  );
};

export default Dossier;
