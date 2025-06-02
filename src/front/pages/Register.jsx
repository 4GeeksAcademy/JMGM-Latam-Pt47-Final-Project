import React, { useState } from 'react';
import logo from './../assets/img/logo.png';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
const backend_url = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
    const navigate = useNavigate()
    const [register, setRegister] = useState({
        email: "",
        password: "",
        confirm_password: "",
        company_name: ""
    })
    function registerUser() {
        if (register.password != register.confirm_password) {
            alert("Las contraseñas no coinciden");
            return;

        }
        fetch(`${backend_url}/register`, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(register)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    navigate("/loginuser")
                } else {
                    alert(data.msg)
                }
            })
            .catch((err) => { return err })
    }
    return (
        <>

            <div className='container-fluid pt-0 d-flex bg-image' style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1733176544089-977104046d96)', height: "100vh" }}>
                <div className='card w-25 m-auto p-4 overflow-y-scroll taljeta' style={{height:"70%"}}>
                    <div className="register text-center container">
                        <i class="fa-solid fa-users-line fs-3 m-2" style={{ color: "#6C11D9" }} />
                        <h2 className='fw-bold'>Bienvenido a MyStock</h2>
                        <div className='border mt-2 mb-5' />
                        <div className="mb-3 text-start">
                            <h5 className="form-h3" style={{color:"Grey"}}>E-mail</h5>
                            <input type="email"
                                value={register.email}
                                onChange={(e) => setRegister({ ...register, email: e.target.value })}
                                className="form-control text-center"
                                placeholder="Escribe tu email aqui" />
                        </div>
                        <div className="mb-3 text-start">
                            <h5 className="form-h3" style={{color:"Grey"}}>Contraseña</h5>
                            <input type="password"
                                value={register.password}
                                onChange={(e) => setRegister({ ...register, password: e.target.value })}
                                className="form-control text-center"
                                placeholder="Escribe tu password aqui" />
                            <h5 className="form-h3 mt-3" style={{color:"Grey"}}>Reingrese su contraseña</h5>
                            <input type="password"
                                value={register.confirm_password}
                                onChange={(e) => setRegister({ ...register, confirm_password: e.target.value })}
                                className="form-control text-center"
                                placeholder="Escribe tu password aqui" />
                            {register.confirm_password.length > 0 && (
                                <p className='mt-2' style={{ color: register.password === register.confirm_password ? 'green' : 'red' }}>
                                    {register.password === register.confirm_password ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
                                </p>
                            )}
                        </div>
                        <div className="mb-3 text-start">
                            <h5 className="form-h3" style={{color:"Grey"}}>Nombre de la empresa</h5>
                            <input type="text"
                                value={register.company_name}
                                onChange={(e) => setRegister({ ...register, company_name: e.target.value })}
                                className="form-control text-center"
                                placeholder="Escribe el nombre de tu compañia aqui"
                                id="exampleInputPassword1" />
                        </div>
                        <div className='d-grid'>
                        <button type="button fw-bold"
                            className="btn text-white mt-3"
                            onClick={registerUser}
                            style={{ backgroundColor: '#6C11D9' }}>Crear usuario</button>
                            </div>
                    </div>
                    <div className="mt-5">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register