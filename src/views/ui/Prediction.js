import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom"; // Import pour redirection

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate(); // Hook pour la redirection

  useEffect(() => {
    const fetchData = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData && userData.access_token) {
        const userToken = userData.access_token;

        try {
          const response = await fetch("http://127.0.0.1:8000/api/users/", {
            headers: { Authorization: `Bearer ${userToken}` },
          });

          if (!response.ok) {
            if (response.status === 401) {
              // Token expiré ou non valide
              setError("Votre session a expiré. Veuillez vous reconnecter.");
              localStorage.removeItem("user"); // Supprimez les informations de l'utilisateur
              navigate("/login"); // Redirige vers la page de connexion
            } else if (response.status === 403) {
              setIsAuthorized(false);
              setError("Vous n'êtes pas autorisé à accéder à cette ressource.");
            } else {
              throw new Error("Erreur lors du chargement des utilisateurs");
            }
          } else {
            const usersData = await response.json();
            setUsers(usersData);
            setIsAuthorized(true);
          }
        } catch (error) {
          setError(error.message);
          console.error("Erreur de chargement:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("Utilisateur non authentifié.");
        navigate("/login"); // Redirige si aucun utilisateur n'est authentifié
      }
    };

    fetchData();
  }, [navigate]);

  const handleBlockUnblockClick = (user, action) => {
    setSelectedUser(user);
    setConfirmAction(action);
    setShowConfirmModal(true);
  };

  const confirmBlockUnblock = async () => {
    setShowConfirmModal(false);
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.access_token && selectedUser) {
      const userToken = userData.access_token;
      const action = confirmAction;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/${selectedUser.id}/${action}/`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${userToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: selectedUser.email }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("Votre session a expiré. Veuillez vous reconnecter.");
            localStorage.removeItem("user");
            navigate("/login");
          } else {
            throw new Error("Erreur lors de la mise à jour de l'utilisateur");
          }
        } else {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === selectedUser.id ? { ...user, is_blocked: action === "block" } : user
            )
          );
          alert(`Utilisateur ${action === "block" ? "bloqué" : "débloqué"} avec succès.`);
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Spinner color="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert color="danger" className="text-center">{error}</Alert>;
  }

  if (!isAuthorized) {
    return (
      <Alert color="danger" className="text-center mt-4">
        Vous n'êtes pas autorisé à accéder à cette ressource.
      </Alert>
    );
  }

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4">Gestion des Utilisateurs</h3>
      <Table bordered hover responsive className="table-light shadow-sm">
        <thead className="table-danger">
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">Aucun utilisateur trouvé.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.prenom}</td>
                <td>{user.nom}</td>
                <td>{user.email}</td>
                <td>{user.id}</td>
                <td>
                  {user.is_blocked ? (
                    <span className="badge bg-danger">Bloqué</span>
                  ) : (
                    <span className="badge bg-success">Actif</span>
                  )}
                </td>
                <td className="text-center">
                  <Button
                    color="danger"
                    size="sm"
                    className="me-2"
                    disabled={user.is_blocked}
                    onClick={() => handleBlockUnblockClick(user, "block")}
                  >
                    Bloquer
                  </Button>
                  <Button
                    color="success"
                    size="sm"
                    disabled={!user.is_blocked}
                    onClick={() => handleBlockUnblockClick(user, "unblock")}
                  >
                    Débloquer
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modale de confirmation */}
      <Modal isOpen={showConfirmModal} toggle={() => setShowConfirmModal(false)}>
        <ModalHeader toggle={() => setShowConfirmModal(false)}>
          Confirmation
        </ModalHeader>
        <ModalBody>
          Êtes-vous sûr de vouloir {confirmAction === "block" ? "bloquer" : "débloquer"}{" "}
          l'utilisateur {selectedUser?.prenom} {selectedUser?.nom} ?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmBlockUnblock}>
            Confirmer
          </Button>{" "}
          <Button color="secondary" onClick={() => setShowConfirmModal(false)}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UserManagement;
