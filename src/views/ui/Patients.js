import React, { useState, useEffect } from "react";
import { Modal, Button, ListGroup, Table, Spinner, Alert } from "react-bootstrap";

const Patients = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [clickedUserId, setClickedUserId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (userId) => {
    setClickedUserId(userId);
    fetchFiles(userId);
    setShow(true);
  };

  const fetchFiles = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}/fichiers/`);
      if (!response.ok) throw new Error("Erreur lors du chargement des fichiers");
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) return;

    fetch("http://localhost:8000/api/patients/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userData.access_token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur lors du chargement des patients.");
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
      <h5 className="mb-4 text-center text-primary">Liste des Patients</h5>
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      <Table striped bordered hover responsive className="table-light rounded shadow-sm">
        <thead className="table-danger">
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Sexe</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Âge</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">Aucun utilisateur trouvé.</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.prenom}</td>
                <td>{user.nom}</td>
                <td>{user.email}</td>
                <td>{user.sexe === "H" ? "Homme" : "Femme"}</td>
                <td>{user.adresse || "N/A"}</td>
                <td>{user.numero}</td>
                <td>{user.age}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fichiers de l'utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {files.length > 0 ? (
            <ListGroup>
              {files.map((file, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  active={selectedFile === file}
                  onClick={() => setSelectedFile(file)}
                >
                  {file.url}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Aucun fichier trouvé pour cet utilisateur.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Patients;
