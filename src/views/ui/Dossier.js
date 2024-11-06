import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import CreateDossierForm from "./forms/CreateDossierForm";
import { useNavigate } from "react-router-dom";

const Dossier = () => {
  const [dossiers, setDossiers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/dossiers")
      .then(response => {
        setDossiers(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des dossiers :", error);
      });
  }, []);

  const handleCreateNew = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    axios.get("http://localhost:8000/api/dossiers")
      .then(response => {
        setDossiers(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des dossiers :", error);
      });
  };

  const handleDossierClick = (dossierId) => {
    navigate(`/fichiers/${dossierId}`);
  };

  return (
    <div className="dossier-container row">
      {dossiers.map((dossier) => (
        <div 
          key={dossier.id} 
          className="dossier-item col-md-3" 
          onClick={() => handleDossierClick(dossier.id)}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faFolder} size="6x" color="#f39c12" />
          <p>Dossier N{dossier.id}</p>
        </div>
      ))}
      
    </div>
  );
};

export default Dossier;
