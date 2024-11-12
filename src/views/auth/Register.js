import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useRegisterUserMutation } from "../../utils/api/auth/auth.api";
import "./Register.css";  // Ajouter votre fichier CSS ici
const logo = require("../../assets/images/logo-bis.png");

const Register = () => {
    const [step, setStep] = useState(1);
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [profil, setProfil] = useState("");
    const [age, setAge] = useState("");
    const [sexe, setSexe] = useState("");
    const [adresse, setAdresse] = useState("");
    const [numero, setNumero] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate();

    const handleNext = () => {
        if (step === 1 && (!prenom || !nom || !email)) {
            setError("Veuillez remplir tous les champs requis.");
            return;
        }
        if (step === 2) {
            if (!profil || age <= 18 || !sexe) {
                setError("Veuillez vérifier votre saisie, l'âge doit être strictement supérieur à 18.");
                return;
            }
        }
        if (step === 3 && (!adresse || !numero)) {
            setError("Veuillez remplir tous les champs requis.");
            return;
        }
        if (step === 4) {
            if (password !== confirmPassword) {
                setError("Les mots de passe ne correspondent pas.");
                return;
            }
            if (!acceptTerms) {
                setError("Vous devez accepter les conditions d'utilisation et le stockage des données.");
                return;
            }
        }
        setError(null);
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ prenom, nom, profil, age, sexe, adresse, numero, email, password });
            navigate("/auth/login");
        } catch (err) {
            console.log(err.data);
            setError("Erreur lors de l'enregistrement.");
        }
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="main-wrapperr">
            <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" 
                 style={{ background: "url(../../assets/images/big/auth-bg.jpg) no-repeat center center" }}>
                <div className="auth-box">
                    <div className="logo">
                        <span className="db"><img src={logo} alt="logo" /></span>
                        <h5 className="font-medium m-b-20">S'inscrire sur Avc Predict</h5>
                    </div>
                    <form className="form-horizontal m-t-20" onSubmit={handleSubmit}>
                        {step === 1 && (
                            <>
                                <label>Prenom <span className="text-danger">*</span></label>
                                <input className="form-control form-control-lg" type="text" placeholder="Prenom" 
                                       value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                                <label>Nom <span className="text-danger">*</span></label>
                                <input className="form-control form-control-lg" type="text" placeholder="Nom" 
                                       value={nom} onChange={(e) => setNom(e.target.value)} required />
                                <label>Email <span className="text-danger">*</span></label>
                                <input className="form-control form-control-lg" type="email" placeholder="Email" 
                                       value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <label>Profil <span className="text-danger">*</span></label>
                                <select className="form-control form-control-lg" value={profil} 
                                        onChange={(e) => setProfil(e.target.value)} required>
                                    <option value="">Sélectionnez un profil</option>
                                    <option value="Patient">Patient</option>
                                    <option value="Medecin">Médecin</option>
                                    <option value="Administrateur">Administrateur</option>
                                </select>
                                <label>Age <span className="text-danger">*</span></label>
                                <input className="form-control form-control-lg" type="number" placeholder="Age" 
                                       value={age} onChange={(e) => setAge(Number(e.target.value))} required min="19" />
                                <label>Sexe <span className="text-danger">*</span></label>
                                <select className="form-control form-control-lg" value={sexe} 
                                        onChange={(e) => setSexe(e.target.value)} required>
                                    <option value="">Sélectionnez le sexe</option>
                                    <option value="M">Masculin</option>
                                    <option value="F">Féminin</option>
                                </select>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <label>Adresse <span className="text-danger">*</span></label>
                                <input className="form-control form-control-lg" type="text" placeholder="Adresse" 
                                       value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
                                <label>Numéro de téléphone <span className="text-danger">*</span></label>
                                <PhoneInput
                                    country={'sn'}  // Par défaut, sélectionnez le pays (exemple : Senegal)
                                    value={numero}
                                    onChange={phone => setNumero(phone)}
                                    inputClass="form-control form-control-lg"  // Styles Bootstrap
                                    containerClass="phone-input-container"
                                    containerStyle={{ width: '100%', marginBottom: '16px' }} // Prend toute la largeur et ajoute une marge
                                    inputStyle={{ width: '100%' }} // Assure que l'input prend toute la largeur
                                    placeholder="Votre numéro de téléphone"
                                    required
                                />
                            </>
                        )}

                        {step === 4 && (
                            <>
                                <label>
                                    Mot de passe <span className="text-danger">*</span>
                                </label>
                                <div className="password-input-wrapper" style={{ position: 'relative', marginBottom: '20px' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control form-control-lg"
                                        placeholder="Mot de passe"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        onClick={toggleShowPassword}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>

                                <label>
                                    Confirmer le mot de passe <span className="text-danger">*</span>
                                </label>
                                <div className="password-input-wrapper" style={{ position: 'relative', marginBottom: '20px' }}>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className="form-control form-control-lg"
                                        placeholder="Confirmer le mot de passe"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        onClick={toggleShowConfirmPassword}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                   
                                <div className="form-check mt-3">
                                    <input className="form-check-input" type="checkbox" id="acceptTerms" 
                                           checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
                                    <label className="form-check-label" htmlFor="acceptTerms">
                                        J'accepte les <a href="/auth/terms-of-service/" target="_blank">conditions d'utilisation</a> et que mes données soient stockées. <span className="text-danger">*</span>
                                    </label>
                                </div>
                            </>
                        )}

                        {error && <p className="text-danger">{error}</p>}

                        <div className="stepper-buttons d-flex justify-content-between">
                            {step > 1 && (
                                <button type="button" className="btn btn-outline-danger me-auto" 
                                        style={{ border: '1px solid red', color: 'red' }} onClick={handlePrevious}>
                                    Précédent
                                </button>
                            )}
                            {step < 4 && (
                                <button type="button" className="btn btn-outline-success ms-auto" 
                                        style={{ border: '1px solid green', color: 'green' }} onClick={handleNext}>
                                    Suivant
                                </button>
                            )}
                            {step === 4 && (
                                <button className="btn btn-danger ms-auto" type="submit" disabled={isLoading}>
                                    S'inscrire
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
