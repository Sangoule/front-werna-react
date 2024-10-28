import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert } from 'react-bootstrap';

const Medecins = () => {
  const [medecins, setMedecins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (userData) {
      const userToken = userData.access_token;

      const fetchMedecins = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/medecins/', {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          setMedecins(response.data);
          setLoading(false);
        } catch (error) {
          setError("Erreur lors de la récupération des médecins.");
          setLoading(false);
        }
      };

      fetchMedecins();
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h5 className="text-center text-primary mb-4">Liste des Médecins</h5>
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      <Table striped bordered hover responsive className="table-light rounded shadow-sm">
        <thead className="table-danger">
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Spécialité</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Expérience</th>
          </tr>
        </thead>
        <tbody>
          {medecins.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">Aucun médecin trouvé.</td>
            </tr>
          ) : (
            medecins.map((medecin, index) => (
              <tr key={index}>
                <td>{medecin.nom}</td>
                <td>{medecin.email}</td>
                <td>{medecin.specialite}</td>
                <td>{medecin.adresse || "N/A"}</td>
                <td>{medecin.telephone}</td>
                <td>{medecin.experience} ans</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Medecins;
