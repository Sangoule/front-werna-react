import React, { useState } from 'react';
import "./Login.css";
import { FaUser, FaPencilAlt } from 'react-icons/fa';
import { useLoginUserMutation } from "../../utils/api/auth/auth.api";
import { useNavigate } from 'react-router-dom';
const logo = require("../../assets/images/logo-bis.png");

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginUser({ email, password }).unwrap();
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/home');
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    // Gestion de la connexion avec Google
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8000/api/auth/google/login"; // Remplacez par l'URL de votre backend
    };

    return (
        <div className="main-wrapperr">
            {isLoading && (
                <div className="preloader">
                    <div className="lds-ripple">
                        <div className="lds-pos"></div>
                        <div className="lds-pos"></div>
                    </div>
                </div>
            )}

            <div className="auth-wrapper d-flex justify-content-center align-items-center" style={{ background: "url(../../assets/images/big/auth-bg.jpg) no-repeat center center" }}>
                <div className="auth-box">
                    <div id="loginform">
                        <div className="logo text-center">
                            <img src={logo} alt="logo" className="logo-img" />
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <form className="form-horizontal m-t-20" id="loginform" onSubmit={handleSubmit}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FaUser size={20} /></span>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FaPencilAlt size={20} /></span>
                                        </div>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            placeholder="Password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    {error && <p className="text-danger">Login failed: {error.message}</p>}
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                                <a href="/auth/forgot-password/" className="text-dark float-right">Forgot pwd?</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group text-center">
                                        <button className="btn btn-block btn-lg btn-primary" type="submit" disabled={isLoading}>Se connecter</button>
                                    </div>
                                    <div className="social-icons text-center">
                                        <button 
                                            type="button" 
                                            className="btn btn-googleplus" 
                                            onClick={handleGoogleLogin}
                                        >
                                            <i className="fab btn-lg fa-google-plus text-dark  ">Google</i> 
                                        </button>
                                    </div>
                                    <div className="form-group text-center m-t-10">
                                        Vous n'avez pas de compte ? <a href="/auth/register/" className="text-info m-l-5"><b>S'inscrire</b></a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
