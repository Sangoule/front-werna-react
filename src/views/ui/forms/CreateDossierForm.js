import React, { useState } from "react";
import axios from "axios";

const CreateDossierForm = ({ onClose }) => { // Ajoutez onClose en tant que prop
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/dossiers/create/", formData);
      setSuccess("Dossier créé avec succès !");
      setFormData({ name: "", description: "" });
      onClose(); // Fermez le formulaire après la création du dossier
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.", err);
    }
  };

  return (
    <div className="col-md-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Créer un nouveau dossier</h4>
          <p className="card-description">Formulaire de création de dossier</p>
          <form className="forms-sample" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="dossierName">Nom du dossier</label>
              <input
                type="text"
                className="form-control"
                id="dossierName"
                name="name"
                placeholder="Nom du dossier"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dossierDescription">Description</label>
              <input
                type="text"
                className="form-control"
                id="dossierDescription"
                name="description"
                placeholder="Description du dossier"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <button type="submit" className="btn btn-primary me-2">Créer</button>
            <button type="button" className="btn btn-light" onClick={onClose}>Annuler</button> {/* Appel de onClose */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDossierForm;
