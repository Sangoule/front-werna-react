import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import axios from "axios";

const Prediction = () => {
  const [predictions, setPredictions] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  const toggleModal = () => setModal(!modal);

  const fetchPredictions = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      const userToken = userData.access_token;
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/predictions/", {
          headers: {
            Authorization: `Bearer ${userToken}`, // Envoi du token
          },
        });
        setPredictions(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des prédictions:", error);
      }
    } else {
      console.log("No user data found in localStorage.");
    }
  };

  const fetchPredictionDetails = async (id) => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      const userToken = userData.access_token;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/prediction/${id}/`, {
          headers: {
            Authorization: `Bearer ${userToken}`, // Envoi du token
          },
        });
        setSelectedPrediction(response.data);
        toggleModal(); // Ouvre le modal
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la prédiction:", error.response || error);
      }
    } else {
      console.log("No user data found in localStorage.");
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  return (
    <div>
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          Liste des Prédictions déjà effectuées
        </CardTitle>
        <CardBody>
          <Container>
            <Row>
              {predictions.map((prediction) => (
                <Col key={prediction.numero} xs="12" sm="6" md="4" lg="3" className="mb-3">
                  <Card body className="text-center" onClick={() => fetchPredictionDetails(prediction.id)}>
                    <CardTitle tag="h5">{prediction.resultat ? "Positive" : "Négative"}</CardTitle>
                    <p>Prédiction Num {prediction.id}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </CardBody>
      </Card>

      {/* Modal pour afficher les détails de la prédiction */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Détails de la Prédiction</ModalHeader>
        <ModalBody>
          {selectedPrediction && (
            <div>
              <p><strong>ID:</strong> {selectedPrediction.id}</p>
              <p><strong>Résultat:</strong> {selectedPrediction.resultat ? "Positive" : "Négative"}</p>
              <p><strong>Commentaire:</strong> {selectedPrediction.commentaire} est {selectedPrediction.resultat ? "Positive" : "Négative"}</p>
              <p><strong>ID Fichier:</strong> {selectedPrediction.id_fichier}</p>
              <p><strong>Fichier:</strong> {selectedPrediction.fichier.url}</p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Fermer</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Prediction;
