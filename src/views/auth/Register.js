import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from "../../utils/api/auth/auth.api";
import "./Register.css";  // Ajouter votre fichier CSS ici
const logo = require("../../assets/images/logo-bis.png");

const Register = () => {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [profil, setProfil] = useState("");
    const [age, setAge] = useState("");
    const [sexe, setSexe] = useState("");
    const [adresse, setAdresse] = useState("");
    const [numero, setNumero] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [registerUser, { isLoading, error }] = useRegisterUserMutation(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ prenom, nom, profil, age, sexe, adresse, numero, email, password });
            navigate('/auth/login'); // Redirection vers la page de connexion après l'enregistrement
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="main-wrapperr">
            <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={{ background: "url(../../assets/images/big/auth-bg.jpg) no-repeat center center" }}>
                <div className="auth-box">
                    <div>
                        <div className="logo">
                            <span className="db"><img src={logo} alt="logo" /></span>
                            <h5 className="font-medium m-b-20">S'inscrire Avc Predict</h5>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <form className="form-horizontal m-t-20" onSubmit={handleSubmit}>
                                    <input className="form-control form-control-lg" type="text" placeholder="Prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                                    <input className="form-control form-control-lg" type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                                    <select className="form-control form-control-lg" value={profil} onChange={(e) => setProfil(e.target.value)} required>
                                        <option value="">Sélectionnez un profil</option>
                                        <option value="Patient">Patient</option>
                                        <option value="Medecin">Médecin</option>
                                        <option value="Administrateur">Administrateur</option>
                                    </select>
                                    <input className="form-control form-control-lg" type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
                                    <input className="form-control form-control-lg" type="text" placeholder="Sexe" value={sexe} onChange={(e) => setSexe(e.target.value)} required />
                                    <input className="form-control form-control-lg" type="text" placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
                                    <input className="form-control form-control-lg" type="text" placeholder="Numero" value={numero} onChange={(e) => setNumero(e.target.value)} required />
                                    <input className="form-control form-control-lg" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <input className="form-control form-control-lg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <input className="form-control form-control-lg" type="password" placeholder="Confirm Password" required />
                                    {error && <p className="text-danger">Registration failed</p>}
                                    <button className="btn btn-lg btn-danger float-end" type="submit" disabled={isLoading}>S'inscrire</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
