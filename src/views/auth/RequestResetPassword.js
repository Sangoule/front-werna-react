import React, { useState } from 'react';
import './ForgotPassword.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importation des icônes

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: demande de réinitialisation, 2: saisie du code et nouveau mot de passe 
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);    

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch("http://127.0.0.1:8000/api/password-reset-request/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Un email de réinitialisation a été envoyé à votre adresse.");
        setStep(2); // Passe à l'étape 2 pour saisir le code et le nouveau mot de passe
      } else {
        const data = await response.json();
        setError(data.detail || "Une erreur s'est produite.");
      }
    } catch (error) {
      setError("Erreur lors de l'envoi de la demande.");
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reset-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token, new_password: newPassword }),
      });

      if (response.ok) {
        setMessage("Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.");
        setStep(-1); // Retourne à l'étape 1 pour d'autres demandes de réinitialisation
      } else {
        const data = await response.json();
        setError(data.detail || "Une erreur s'est produite.");
      }
    } catch (error) {
      setError("Erreur lors de la réinitialisation du mot de passe.");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        {step === 1 ? (
          <>
            <h2>Mot de Passe Oublié</h2>
            <p>Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
            <form onSubmit={handleSubmitEmail}>
              <div className="form-group">
                <label htmlFor="email">Adresse Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Votre adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button red-button">Envoyer</button>
            </form>
          </>
        ) : (
          <>
            <h2>Réinitialiser le Mot de Passe</h2>
            <p>Entrez le code de réinitialisation que vous avez reçu ainsi qu'un nouveau mot de passe.</p>
            <form onSubmit={handleSubmitNewPassword}>
              <div className="form-group">
                <label htmlFor="token">Code de Réinitialisation</label>
                <input
                  type="text"
                  id="token"
                  placeholder="Code de réinitialisation"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Nouveau Mot de Passe</label>
                <div className="password-input-container">
                    <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    placeholder="Votre nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    />
                    <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                
                
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le Mot de Passe</label>
                <div className="password-input-container">
                    <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirmez le nouveau mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    />
                    <span onClick={toggleConfirmPasswordVisibility} className="password-toggle-icon">
                        {showConfirmPassword? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
              </div>
              <button type="submit" className="submit-button red-button">Réinitialiser le Mot de Passe</button>
            </form>
          </>
        )}
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
