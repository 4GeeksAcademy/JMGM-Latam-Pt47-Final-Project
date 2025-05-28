import React from 'react'
import logo from './../assets/img/logo.png'
import { Footer } from '../components/Footer'

const RecoveryPassword = () => {
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
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <h3 for="exampleInputPassword1" className="form-label">Reingrese nueva contraseña</h3>
                <input type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <div className="mt-5">
            <Footer/>
        </div>
        </>
    )
}
export default RecoveryPassword