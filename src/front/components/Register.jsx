import React, { useState } from 'react';
import logo from './../assets/img/logo.png';
import { Footer } from './Footer';
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
                </nav>
            </div>
            <div className="register text-center container w-50">
                <div className="mb-3">
                    <h3 className="form-h3">Email address</h3>
                    <input type="email"
                        value={register.email}
                        onChange={(e) => setRegister({ ...register, email: e.target.value })}
                        className="form-control text-center"
                        placeholder="Escribe tu email aqui" />
                </div>
                <div className="mb-3">
                    <h3 className="form-h3">Password</h3>
                    <input type="password"
                        value={register.password}
                        onChange={(e) => setRegister({ ...register, password: e.target.value })}
                        className="form-control text-center"
                        placeholder="Escribe tu password aqui" />
                    <h3 className="form-h3">Reingrese el password</h3>
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
                <div className="mb-3">
                    <h3 className="form-h3">Company name</h3>
                    <input type="text"
                        value={register.company_name}
                        onChange={(e) => setRegister({ ...register, company_name: e.target.value })}
                        className="form-control text-center"
                        placeholder="Escribe el nombre de tu compañia aqui"
                        id="exampleInputPassword1" />
                </div>
                <button type="buttom"
                    className="btn btn-primary"
                    onClick={registerUser}
                    style={{ backgroundColor: '#6C11D9' }}>Crear usuario</button>
            </div>
            <div className="mt-5">
                <Footer />
            </div>
        </>
    )
}

export default Register