import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Importer useNavigate

const Fichiers = () => {
  const { dossierId } = useParams();
  const [fichiers, setFichiers] = useState([]);
  const navigate = useNavigate(); // Initialiser useNavigate

  useEffect(() => {
    axios.get(`http://localhost:8000/api/dossier/${dossierId}/fichiers`)
      .then(response => {
        const imageFiles = response.data.filter(fichier => 
          fichier.type === "image/png" || fichier.type === "image/jpeg"
        );
        setFichiers(imageFiles);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des fichiers :", error);
      });
  }, [dossierId]);

  return (
    <div className="container my-4">
      <button className="btn btn-danger mb-3" onClick={() => navigate(-1)}>
        &larr; Retour
      </button>
      <h3 className="text-center mb-4 text-dark">Images dans le Dossier N° {dossierId}</h3>
      {fichiers.length > 0 ? (
        <div className="row">
          {fichiers.map(fichier => (
            <div key={fichier.id} className="col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={fichier.url}
                  alt={`Image #${fichier.id}`}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate">Image #{fichier.id}</h5>
                  <p className="card-text small text-muted">
                    Type : {fichier.type}<br />
                    Taille : {fichier.taille} octets<br />
                    Ajouté le : {new Date(fichier.create_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">Aucune image trouvée dans ce dossier.</p>
      )}
    </div>
  );
};

export default Fichiers;
