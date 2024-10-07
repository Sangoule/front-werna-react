import React, { useState, useEffect, useTransition } from "react";
import { Modal, Button, ListGroup } from 'react-bootstrap';

const Patients = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  
  const [show, setShow] = useState(false);  // Pour gérer l'affichage du popup
  const [files, setFiles] = useState([]);   // Pour stocker les fichiers de l'utilisateur
  const [selectedFile, setSelectedFile] = useState(null); // Pour stocker le fichier sélectionné
  const [clickedUserId, setClickedUserId] = useState(null);  // Stocker l'utilisateur cliqué pour la prédiction

  const handleSupprimer = () => {
    // Demander une confirmation avant suppression
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?');
    if (confirmation) {
      console.log('Suppression de l\'élément en cours...');
      // Exemple de suppression : Appel à une API pour supprimer un élément
      // await fetch(/api/delete/${id}, { method: 'DELETE' });
    } else {
      console.log('Suppression annulée.');
    }
  };
  const handleVoir = () => {
    // Exemple : Redirection vers une page de détails ou ouverture d'une modal
    console.log('Voir les détails de cet élément.');
    // Si tu veux rediriger vers une autre page, utilise par exemple :
    // history.push(/details/${id});
  };
  // Fonction pour afficher et fermer le popup
  const handleClose = () => setShow(false);
  const handleShow = (userId) => {
    console.log('Prédire pour l\'utilisateur avec l\'ID :', userId);
    setClickedUserId(userId);  // Enregistre l'ID de l'utilisateur cliqué
    fetchFiles(userId);  // Récupère les fichiers pour cet utilisateur
    setShow(true);
  };

  // Fonction pour récupérer les fichiers de l'utilisateur cliqué
  const fetchFiles = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}/fichiers/`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des fichiers');
      }
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fonction pour lancer la prédiction
  const handlePrediction = async () => {
    if (!selectedFile) {
        alert('Veuillez sélectionner un fichier.');
        return;
    }

    try {
        const formData = new FormData();
        
        // Ajout du fichier au FormData
        formData.append('url', selectedFile.url);  // Ou 'url' si c'est un lien
        formData.append('fichier_id', selectedFile.id);  // ID du fichier sélectionné
        formData.append('commentaire', "Le résultat de la prédiction");  // Commentaire
        formData.append('user_id', clickedUserId);  // Ajout de l'ID de l'utilisateur cliqué
        formData.forEach((value, key) => {
          console.log(key, value);
        });
        
        // Récupérer le token de l'utilisateur
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = userData?.access_token; // Assurez-vous que le token est bien stocké dans l'objet userData

        // Envoi de la requête de prédiction
        const response = await fetch('http://127.0.0.1:8000/api/predict/url', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`, // En-tête avec le token
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la prédiction');
        }

        const result = await response.json();
        alert(`Prédiction réussie pour l'utilisateur ${clickedUserId} : ${JSON.stringify(result)}`);
        handleClose();  // Fermer la modal après la prédiction
    } catch (error) {
        console.error('Erreur lors de la prédiction:', error);
    }
};



  // Charger les patients
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
      const userToken = userData.access_token;
    } else {
      console.log("No user data found in localStorage.");
    }

    startTransition(() => {
      fetch("http://localhost:8000/api/patients/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userData.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setUsers(data);
          } else {
            throw new Error("Unexpected data format");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "An error occurred");
          setLoading(false);
        });
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="row flex-grow">
      <div className="col-12 grid-margin stretch-card">
        <div className="card card-rounded">
          <div className="card-body">
            <div className="d-sm-flex justify-content-between align-items-start">
              <div>
                <h4 className="card-title card-title-dash">Patients</h4>
                <p className="card-subtitle card-subtitle-dash">Liste des patients</p>
              </div>
            </div>
            <div className="table-responsive mt-1">
              <table className="table select-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Sexe</th>
                    <th>Adresse</th>
                    <th>Téléphone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{`${user.prenom} ${user.nom}`}</td>
                      <td>{user.email}</td>
                      <td>{user.sexe === "H" ? "Homme" : "Femme"}</td>
                      <td>{user.adresse || "N/A"}</td>
                      <td>{user.numero}</td>
                      <td>
                        <button className="btn btn-success btn-sm" onClick={() => handleVoir(user.id)}>Voir</button>&nbsp;
                        <button className="btn btn-primary btn-sm" onClick={() => handleShow(user.id)}>Prédire</button>&nbsp;
                        <button className="btn btn-danger btn-sm" onClick={handleSupprimer}>Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour la prédiction */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Liste des fichiers de l'utilisateur</Modal.Title>
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
                
                {file.id}-{file.url} 
              </ListGroup.Item>
            ))}
          </ListGroup>
          ) : (
            <p>Aucun fichier trouvé pour cet utilisateur.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="success" onClick={handlePrediction}>
            Lancer la prédiction
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Patients;
