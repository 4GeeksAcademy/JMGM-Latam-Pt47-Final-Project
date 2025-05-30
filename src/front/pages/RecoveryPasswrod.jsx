import React, { useState } from 'react'
import logo from './../assets/img/logo.png'
import { Footer } from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'

const backend_url = import.meta.env.VITE_BACKEND_URL;

const RecoveryPassword = () => {
    const navigate= useNavigate()
    const params= useParams()
    const [recovery, setRecovery]= useState({
        password: "",
        confirm_password: ""
    })
    function recoveryPassword(){
        fetch(`${backend_url}/recovery/${params.uuid}`,{
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(recovery)
        })
        .then((response)=> response.json())
        .then((data)=>{
            if (data.ok) {
                    navigate("/loginuser")
                } else {
                    alert(data.msg)
                }
        })
        .catch((err)=>{ return err })
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
                            <div className='container-fluid d-flex row px-5' style={{ backgroundColor: '#6C11D9' }}>
                                <button className='col fw-bold text-light btn'>Inicio</button>
                                <button className='col fw-bold text-light btn'>Caracteristicas</button>
                                <button className='col fw-bold text-light btn'>Sobre nosotros</button>
                                <button className='col fw-bold text-light btn'>Preguntas Frecuentes</button>
                            </div>
                        </nav>
                    </div>
        <form className="container text-center recovery">
            <div className="mb-3">
                <h3 for="exampleInputEmail1" className="form-label">Nueva Contraseña</h3>
                <input type="password" 
                value={recovery.password}
                onChange={(e) => setRecovery({ ...recovery, password: e.target.value })}
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <h3 for="exampleInputPassword1" className="form-label">Reingrese nueva contraseña</h3>
                <input type="password" 
                value={recovery.confirm_password}
                onChange={(e) => setRecovery({ ...recovery, confirm_password: e.target.value })}
                className="form-control" 
                id="exampleInputPassword1"/>
                {recovery.confirm_password.length > 0 && (
                        <p className='mt-2' style={{ color: recovery.password === recovery.confirm_password ? 'green' : 'red' }}>
                            {recovery.password === recovery.confirm_password ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
                        </p>
                    )}
            </div>
            <button type="button" 
            onClick={recoveryPassword}
            style={{ backgroundColor: '#6C11D9' }}
            className="btn">Submit</button>
        </form>
        <div className="mt-5">
            <Footer/>
        </div>
        </>
    )
}
export default RecoveryPassword