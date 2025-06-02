import profile from "./../assets/img/profile.png"
import useGlobalReducer from "../hooks/useGlobalReducer";
import React, { useEffect, useState } from 'react'


const PerfilUser = () => {

    const { dispatch } = useGlobalReducer()
    const [company, setCompany] = useState()
    const [email, setEmail] = useState()
    const backendUrl = import.meta.env.VITE_BACKEND_URL

      const userInfo = () => {
    
        let accessToken = localStorage.getItem("token")
        if (!accessToken) {
          setError("No se encontró el token de autenticación. Por favor, inicia sesión.")
          setLoading(false)
          return
        }
    
        fetch(`${backendUrl}/user`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        })
          .then(resp => resp.json())
          .then((data) => {
            if (data) {
              setCompany(data.user.company)
              setEmail(data.user.email)
            } else {
    
              throw new Error("Formato de datos de usuario inesperado del servidor.")
            }
          })
          .catch(error => console.log(error))
      }
    
      useEffect(() => {
        userInfo()
        document.title = "MyStock"
      }, []);

  return (
    <>
    <div className='container-fluid pt-0 d-flex bg-image d-flex flex-column' style={{backgroundImage: 'url(https://images.unsplash.com/photo-1641743270359-1ebbaedf650e)', height:"20%"}}>
      <div className='row h-50'></div>
      <div className='d-flex' style={{backgroundColor: "white h-100"}}>      
        <img src={profile} alt="perfil" width="60" height="60"
                        className="d-inline-block align-text-top border border-white border-4 rounded-circle" style={{backgroundColor:"white"}}/>
                        <p className="text-start text-white mb-0 ms-2"><b className="fs-6 fw-bold">{company}</b>
									<br></br>
									{email}</p>
                         </div>
    </div>
    <div className="d-flex mt-2 p-4 ps-5">
      <div className="col-3">
        <b>Miembro desde </b>
        <p className="fs-5">00/00/00</p>

        <b>Rubro</b>
        <p className="fs-5">Administración y Gerencia</p>
                <b>Teléfono</b>
        <p className="fs-5">0424 000 0000</p>
      </div>
      <div className="border mx-2"/>
      <div className="col d-flex mx-auto justify-content-center flex-column align-items-center"><i class="fa-solid fa-person-digging" style={{color:"grey",fontSize:"70px"}}/> <b className="fs-3" style={{color:"grey"}}>¡Nuevas funciones pronto!</b></div>
    </div>
    </>
  )
}

export default PerfilUser