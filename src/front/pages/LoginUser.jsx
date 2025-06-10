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
        fetch(`${backend_url}send-mail`, {
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
        <div className='container-fluid pt-0 d-flex bg-image' style={{backgroundImage: 'url(https://images.unsplash.com/photo-1642516303080-431f6681f864?)', height:"100vh"}}>
            <div className='card w-25 m-auto h-75 p-4 overflow-y-scroll taljeta'>
                    <div className="text-center container login">
                        <i class="fa-solid fa-user fs-3 m-2" style={{color:"#6C11D9"}} />
                        <h2 className='fw-bold'>Bienvenido de vuelta</h2>
                        <div className='border mt-2 mb-5'/>
                        <div className="mb-4 text-start fs-6">
                            <h5 htmlFor="exampleInputEmail1" className="form-label" style={{color:"Grey"}}>E-mail</h5>
                            <input type="email"
                                placeholder='Introduce tu email aqui'
                                value={login.email}
                                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                                className="form-control text-center"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-1 text-start fs-6">
                            <h5 htmlFor="exampleInputPassword1" className="form-label" style={{color:"Grey"}}>Contraseña</h5>
                            <input type="password"
                                placeholder='Introduce tu contraseña aqui'
                                value={login.password}
                                onChange={(e) => setLogin({ ...login, password: e.target.value })}
                                className="form-control text-center"
                                id="exampleInputPassword1" />

                        </div>
                        <div className='d-flex justify-content-md-end' >
                        <a type="button" className="button" data-bs-toggle="modal" data-bs-target="#recoverPassword" style={{color:"Indigo"}}>
                            Recuperar contraseña
                        </a></div><br></br>


                        <div className="modal fade" id="recoverPassword" tabIndex="-1" aria-labelledby="recoverPasswordLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="recoverPasswordLabel">Recuperar contraseña</h1>
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
                        <div className='d-grid fw-bold'>
                        <button type="button"
                            className="btn text-white mt-3"
                            style={{ backgroundColor: '#6C11D9' }}
                            onClick={loginUser}
                        >Iniciar Sesion</button>
                        </div>
                    </div>
                    <div className='mt-5'>
                    </div>
            </div>
        </div>
    )
}

export default LoginUser