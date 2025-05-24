import React from 'react';
import { json, useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from 'react';
import { Footer } from './Footer';
import logo from "./../assets/img/logo.png"
const backend_url = import.meta.env.VITE_BACKEND_URL;

const LoginUser = () => {
    const navigate = useNavigate()
    const { dispatch } = useGlobalReducer()
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const loginUser = () => {
        fetch(`${backend_url}/login`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(login)
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log("data recibida en el login", data);

                if (data.token) {
                    localStorage.setItem("token", data.token)
                    dispatch({
                        type: "set_current_user",
                        payload: data.user
                    })
                    localStorage.setItem('currentUser', JSON.stringify(data.user))
                    navigate("/app/perfil");
                } else {
                    dispatch({
                        type: "set_current_user",
                        payload: null
                    })
                    alert("Login incorrecto. Revisa tu email o contraseña.");
                }
            })
            .catch((err) => {
                dispatch({
                    type: "set_current_user",
                    payload: null
                })
                console.error("Error en el login:", err);
            })
    };
    return (
        <div>
            <div className='align-items-start'>
                <nav className="navbar fixed-top pb-0" style={{ backgroundColor: 'white' }}>
                    <div className="container-fluid pb-2 pe-5">
                        <img src={logo}
                            type="button"
                            onClick={() => { navigate('/') }}
                            alt="Logo"
                            width="105"
                            height="40"
                            className="d-inline-block align-text-top"></img>
                    </div>
                    <div className='container-fluid d-flex row px-5' style={{ backgroundColor: '#6C11D9' }}>
                        <button className='col fw-bold text-light btn'>Inicio</button>
                        <button className='col fw-bold text-light btn'>Caracteristicas</button>
                        <button className='col fw-bold text-light btn'>Sobre nosotros</button>
                        <button className='col fw-bold text-light btn'>Preguntas Frecuentes</button>
                    </div>
                </nav>
            </div>
            <div className="text-center container login w-50">
                <div className="mb-3">
                    <h3 for="exampleInputEmail1" className="form-label">Email address</h3>
                    <input type="email"
                        placeholder='Introduce tu email aqui'
                        value={login.email}
                        onChange={(e) => setLogin({ ...login, email: e.target.value })}
                        className="form-control text-center"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <h3 for="exampleInputPassword1" className="form-label">Password</h3>
                    <input type="password"
                        placeholder='Introduce tu contraseña aqui'
                        value={login.password}
                        onChange={(e) => setLogin({ ...login, password: e.target.value })}
                        className="form-control text-center"
                        id="exampleInputPassword1" />

                </div>
                
                <a type="button" className="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Recuperar contraseña
                </a><br></br>

                
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Recuperar contraseña</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input className="form-control" placeholder="Ingrese su correo aqui"></input>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Enviar correo</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button"
                    className="btn btn-primary mt-3"
                    style={{ backgroundColor: '#6C11D9' }}
                    onClick={loginUser}
                >Iniciar Sesion</button>
            </div>
            <div className='mt-5'>
                <Footer />
            </div>
        </div>
    )
}

export default LoginUser