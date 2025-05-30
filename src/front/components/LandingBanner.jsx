import React from 'react'

const LandingBanner = () => {
  return (
    <div className='d-flex m-3 px-4' id="start" style={{height:"40%"}}>
        <div className='col'>

            <div className="mx-5 mt-5">
                <h1 className="fw-bold" style={{fontSize:"5vw", color:"#0C0317"}}>Gestiona hoy tu comercio sin limites</h1>
            </div>
            <div className='border-top border-2 m-4' style={{borderTopColor:"#6C11D9"}}/>
            <div className='mx-5'>
                <p className='' style={{fontSize:"1.4vw"}}>Nuestra plataforma de administración de recursos especializada te ayuda a llevar
                    tu empresa al siguiente nivel. Registrate de forma rápida y sencilla y empieza a transformar tu negocio hoy.
                </p>
            </div>

        </div>
        <div className='d-flex col'>
            <div className='col' />
            <img className="col-8 img-fluid" src='src/front/assets/img/bannerpic.png' />
            <div className='col' />
        </div>
    </div>
  )
}

export default LandingBanner