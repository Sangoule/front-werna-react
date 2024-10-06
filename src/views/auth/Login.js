import React, { useState } from 'react';
import "./Login.css";
import { FaUser, FaPencilAlt } from 'react-icons/fa';
import { useLoginUserMutation } from "../../utils/api/auth/auth.api";
import { useNavigate } from 'react-router-dom'; 
const logo = require("../../assets/images/logo-icon.png");

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginUser, { isLoading, error }] = useLoginUserMutation(); // Utilisation de la mutation
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginUser({ email, password }).unwrap();
            
            // Stocker les informations de l'utilisateur dans le local storage
            localStorage.setItem('user', JSON.stringify(userData));

            // Rediriger l'utilisateur vers une autre page
            navigate('/');  
            
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="main-wrapper">
            {isLoading && (
                <div className="preloader">
                    <div className="lds-ripple">
                        <div className="lds-pos"></div>
                        <div className="lds-pos"></div>
                    </div>
                </div>
            )}

            <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={{ background: "url(../../assets/images/big/auth-bg.jpg) no-repeat center center" }}>
                <div className="auth-box">
                    <div id="loginform">
                        <div className="logo">
                            <span className="db"><img src={logo} alt="logo" /></span>
                            <h5 className="font-medium m-b-20">Sign In to Avc Predict</h5>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <form className="form-horizontal m-t-20" id="loginform" onSubmit={handleSubmit}>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><FaUser/></span>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg" 
                                            placeholder="Username" 
                                            aria-label="Username" 
                                            aria-describedby="basic-addon1" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon2"><FaPencilAlt/></span>
                                        </div>
                                        <input 
                                            type="password" 
                                            className="form-control form-control-lg" 
                                            placeholder="Password" 
                                            aria-label="Password" 
                                            aria-describedby="basic-addon2" 
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
                                                <a href="#recover" className="text-dark float-right"><i className="fa fa-lock m-r-5"></i> Forgot pwd?</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group text-center">
                                        <div className="col-xs-12 p-b-20 login-b">
                                            <button className="btn btn-block btn-lg btn-info" type="submit" disabled={isLoading}>Log In</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-12 m-t-10 text-center">
                                            <div className="social">
                                                <a href="#facebook" className="btn btn-facebook" data-toggle="tooltip" title="Login with Facebook"> <i aria-hidden="true" className="fab fa-facebook"></i> </a>
                                                <a href="#google" className="btn btn-googleplus" data-toggle="tooltip" title="Login with Google"> <i aria-hidden="true" className="fab fa-google-plus"></i> </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group m-b-0 m-t-10">
                                        <div className="col-sm-12 text-center">
                                            Don't have an account? <a href="authentication-register1.html" className="text-info m-l-5"><b>Sign Up</b></a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div id="recoverform" style={{ display: "none" }}>
                        <div className="logo">
                            <span className="db"><img src="../../assets/images/logo-icon.png" alt="logo" /></span>
                            <h5 className="font-medium m-b-20">Recover Password</h5>
                            <span>Enter your Email and instructions will be sent to you!</span>
                        </div>
                        <div className="row m-t-20">
                            <form className="col-12" action="index.html">
                                <div className="form-group row">
                                    <div className="col-12">
                                        <input className="form-control form-control-lg" type="email" required placeholder="Email" />
                                    </div>
                                </div>
                                <div className="row m-t-20">
                                    <div className="col-12">
                                        <button className="btn btn-block btn-lg btn-danger" type="submit" name="action">Reset</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
