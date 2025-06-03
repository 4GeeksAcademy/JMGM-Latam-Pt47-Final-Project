import React from 'react'
import img from './../assets/img/bannerpic.png'

const LandingBanner = () => {
  return (
    <div className='d-flex m-3 px-4 row' id="start" style={{height:"40%"}}>
        <div className='col-lg col-md-12'>

            <div className="mx-md-5 mt-md-5 mx-xs-2 mt-xs-2 text-center text-md-start">
                <h1 className="fw-bold banner-title" style={{fontSize:"max(5vw, 30px)", color:"#0C0317"}}>Gestiona hoy tu comercio sin limites</h1>
            </div>
            <div className='border-top border-2 m-4' style={{borderTopColor:"#6C11D9"}}/>
            <div className='mx-md-5 mx-xs-2 text-center text-md-start'>
                <p className='' style={{fontSize:"max(1.2vw, 15px)"}}>Nuestra plataforma de administración de recursos especializada te ayuda a llevar
                    tu empresa al siguiente nivel. Regístrate de forma rápida y sencilla y empieza a transformar tu negocio hoy.
                </p>
            </div>

        </div>
        <div className='d-flex col-lg col-md-12'>
            <div className='col' />
            <img className="col-8 img-fluid" src={img} />
            <div className='col' />
        </div>
    </div>
  )
}

export default LandingBanner