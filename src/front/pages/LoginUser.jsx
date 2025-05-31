import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from 'react';
import { Footer } from '../components/Footer';
import { LandingNavbar } from "../components/LandingNavbar"
import logo from "./../assets/img/logo.png"
const backend_url = import.meta.env.VITE_BACKEND_URL;

const LoginUser = () => {
    const navigate = useNavigate()
    const { dispatch } = useGlobalReducer()
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const [email, setEmail] = useState({
        email: ""
    })
    function sendEmail() {
        fetch(`${backend_url}/send-mail`, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(email)
        })
            .then((response) => { return response.json() })
            .then((data) => {
                Swal.fire({
                    title: "Email enviado correctamente!",
                    icon: "success",
                    draggable: true
                });

                if (data.ok) {
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops! Algo salió mal.",
                        text: (data.msg),
                    });
                }
            })
            .catch((err) => { return err })
    }
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
                    navigate("/app");
                } else {
                    dispatch({
                        type: "set_current_user",
                        payload: null
                    })
                    Swal.fire({
                        icon: "error",
                        title: "Oops! Algo salió mal.",
                        text: "Revisa tu email o contraseña!",
                    });
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
            <div className="text-center container login w-50">
                <div className="mb-3">
                    <h3 htmlFor="exampleInputEmail1" className="form-label">Email address</h3>
                    <input type="email"
                        placeholder='Introduce tu email aqui'
                        value={login.email}
                        onChange={(e) => setLogin({ ...login, email: e.target.value })}
                        className="form-control text-center"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <h3 htmlFor="exampleInputPassword1" className="form-label">Password</h3>
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


                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Recuperar contraseña</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input className="form-control"
                                    type="text"
                                    value={email.email}
                                    onChange={(e) => setEmail({ ...email, email: e.target.value })}
                                    placeholder="Ingrese su correo aqui"></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button"
                                    data-bs-dismiss="modal"
                                    onClick={() => { sendEmail() }}
                                    className="btn btn-success">Enviar correo</button>
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
            </div>
        </div>
    )
}

export default LoginUser