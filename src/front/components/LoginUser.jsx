import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from 'react';
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
                    console.log("usuario seteado:", data.user);
                    
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
        <div className="text-center mt-5 container">
            <div className="mb-3">
                <h1 className="text-center mt-5">Logueate aqui!!!</h1>
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email"
                    value={login.email}
                    onChange={(e) => setLogin({ ...login, email: e.target.value })}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password"
                    value={login.password}
                    onChange={(e) => setLogin({ ...login, password: e.target.value })}
                    className="form-control"
                    id="exampleInputPassword1" />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            </div>
            <button type="button"
                className="btn btn-primary"
                onClick={loginUser}
            >Iniciar Sesion</button>
        </div>
    )
}

export default LoginUser