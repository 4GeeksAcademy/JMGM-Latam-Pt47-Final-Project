import { Link } from "react-router-dom";
import logo from "./../assets/img/logo.png";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";


export const LandingNavbar = () => {
    const { store, dispatch } = useGlobalReducer()
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()

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
                if (data.user) {
                    dispatch({
                        type: 'set_current_user',
                        payload: data.user
                    });
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                } else {
                    localStorage.removeItem('currentUser');
                }
            })
            .catch((err) => console.error(err))
    }, [])

    return (
        <nav className="navbar fixed-top pb-0" style={{ backgroundColor: 'white' }}>
            <div className="container-fluid pb-2 pe-5">
                <img src={logo}
                    type="button"
                    onClick={() => { navigate("/app") }}
                    alt="Logo"
                    width="105"
                    height="40"
                    className="d-inline-block align-text-top"></img>
                <div className="justify-content-end">
                    <Link className="btn btn-info text-light me-2" style={{ backgroundColor: '#6C11D9' }} to='/register'>Registrate aqui</Link>
                    {localStorage.getItem('currentUser') == null &&
                        <Link className="btn btn-info text-light" style={{ backgroundColor: '#6C11D9' }} to='/loginuser'><i class="fa-solid fa-right-to-bracket" />&nbsp;&nbsp;Acceso</Link>
                    }
                    {localStorage.getItem('currentUser') &&
                        <Link className='btn' style={{ backgroundColor: '#6C11D9' }} to='/app/perfil'>Dashboard</Link>
                    }
                </div>
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
