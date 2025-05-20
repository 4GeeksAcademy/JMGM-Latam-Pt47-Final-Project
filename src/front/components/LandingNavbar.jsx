import { Link } from "react-router-dom";
import logo from "./../assets/img/logo.png";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const LandingNavbar = () => {
    const { store, dispatch } = useGlobalReducer()
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(`${backend_url}/user`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }

        })
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: 'set_current_user',
                    payload: data.user
                })
             })
            .catch((err) => console.error(err))
    }, [])

    return (
        <nav className="navbar fixed-top pb-0" style={{ backgroundColor: 'white' }}>
            <div className="container-fluid pb-2 pe-5">
                <img src={logo} type="button" alt="Logo" width="105" height="40" className="d-inline-block align-text-top"></img>
                {store.currentUser == null &&
                    <Link className="btn btn-info text-light" to='/loginuser'><i class="fa-solid fa-right-to-bracket" />&nbsp;&nbsp;Acceso</Link>
                }
                {store.currentUser &&
                    <Link className='btn btn-success' to='/app'>Dashboard</Link>
                }
            </div>
            <div className='container-fluid d-flex row px-5 m-0' style={{ backgroundColor: '#6C11D9' }}>
                <button className='col fw-bold text-light btn'>Inicio</button>
                <button className='col fw-bold text-light btn'>Caracteristicas</button>
                <button className='col fw-bold text-light btn'>Sobre nosotros</button>
                <button className='col fw-bold text-light btn'>Preguntas Frecuentes</button>
            </div>
        </nav>
    )
}
