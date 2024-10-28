import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import React, { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FaUser } from "react-icons/fa"; // Icône d'utilisateur
import "./ProjectTable.css"; // Importer un fichier CSS personnalisé

const ProjectTables = () => {
  const [predictions, setPredictions] = useState([]);

  const fetchPredictions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/predictions/");
      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des prédictions :", error);
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  return (
    <div>
      <Card className="shadow-sm">
        <CardBody>
          <CardTitle tag="h5" className="text-primary mb-4">Résultat des Prédictions</CardTitle>
          <CardSubtitle className="mb-4 text-muted" tag="h6">
            Vue d'ensemble des prédictions
          </CardSubtitle>

          <Table className="mt-3 align-middle" responsive hover>
            <thead>
              <tr className="table-header">
                <th>N Prédiction</th>
                <th>Patient</th>
                <th>Score</th>
                <th>Résultat</th>
                <th>Commentaire</th>
                <th>Médecin</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((prediction) => (
                <tr key={prediction.id} className="border-bottom prediction-row">
                  <td><span className="fw-bold">{prediction.id}</span></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0">{prediction.patient.prenom} {prediction.patient.nom}</h6>
                        <small className="text-muted">{prediction.patient.email}</small>
                      </div>
                    </div>
                  </td>
                  
                  <td style={{ width: "20%" }}>
                    <ProgressBar 
                      now={Math.floor(prediction.score)} 
                      label={`${Math.floor(prediction.score)}%`} 
                      variant={prediction.score < 0 ? "success" : prediction.score > 0 ? "warning" : "danger"}
                    />
                  </td>
                  <td>
                    <span className={`result-badge ${prediction.resultat === "Positif" ? "resultat-positif" : "resultat-negatif"}`}>
                      {prediction.resultat === "Positif" ? "Positif": "Négatif"}
                    </span>
                  </td>
                  <td>{prediction.commentaire}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="mb-0">{prediction.medecin.prenom} {prediction.medecin.nom}</h6>
                        <small className="text-muted">{prediction.medecin.email}</small>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
