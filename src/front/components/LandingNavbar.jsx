import { useNavigate } from "react-router-dom";
import logo from "./../assets/img/logo.png"
export const LandingNavbar = () => {
    const navigate= useNavigate()
  return (
                <nav className="navbar fixed-top pb-0" style={{backgroundColor:'white'}}>
                <div className="container-fluid pb-2 pe-5">
                    <img src={logo} type="button" alt="Logo" width="105" height="40" className="d-inline-block align-text-top"></img>
                    <button className="btn btn-info text-light" 
                    onClick={()=>{
                        navigate("/loginuser")
                    }}
                    type="submit"><i class="fa-solid fa-right-to-bracket" />&nbsp;&nbsp;Acceso</button>
                </div>
                <div className='container-fluid d-flex row px-5' style={{backgroundColor:'#6C11D9'}}>
                    <button className='col fw-bold text-light btn'>Inicio</button>
                    <button className='col fw-bold text-light btn'>Caracteristicas</button>
                    <button className='col fw-bold text-light btn'>Sobre nosotros</button>
                    <button className='col fw-bold text-light btn'>Preguntas Frecuentes</button>
                </div>
            </nav>
  )
}
