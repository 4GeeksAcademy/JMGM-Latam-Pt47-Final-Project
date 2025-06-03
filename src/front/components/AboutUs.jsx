import React from 'react';
import { LandingNavbar } from './LandingNavbar';
import { Footer } from './Footer';

function AboutUs() {
    return <>
            <div className="container-fluid mt-3 text-center" style={{background: "#6C11D9"}}>
                <div className="row g-0 align-items-center">
                    <div className="col-md-6">
                        <img src='src/front/assets/img/aboutus1.png' className="img-fluid" alt="https://cdn.pixabay.com/photo/2018/01/11/06/26/construction-3075498_1280.jpg" />
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                        <div className="card-body card-text-center text-white" style={{ minHeight: '200px' }}>
                            <h1 className="card-title fw-bold" >Sobre nuestra empresa</h1>
                            <div className='border w-50 my-3 mx-auto' />
                            <p className="card-text fs-5 px-3" >En <b>MyStock</b> nuestro propósito es simple, entregar un producto de calidad mediante un desarrollo ético, colaborativo 
                            y enfocado en el cliente. Trabajamos de la mano con nuestros clientes y aliados para transformar nuestro entorno y convertir obstáculos en progreso.</p>
                        </div>
                    </div>
                </div>
            </div>

        <div className="container-fluid text-center" style={{background: 'white'}}>
            <div className="row g-0 flex-row-reverse align-items-center">
                <div className="col-md-6">
                    <img src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866" className="img-fluid rounded-end" alt="..."/>
                </div>
                <div className="col-md-6  align-items-center justify-content-center">
                    <div className="card-body">
                        <h1 className="card-title fw-bold">Nuestra misión</h1>
                        <div className='border w-50 my-3 mx-auto' />
                        <p className="card-text fs-5 px-3"><b>MyStock</b> busca ser la primera opción para que emprendedores y pequeños comercios administren su inventario.
                            Por medio de nuestra plataforma optimizada para la sencillez y eficacia.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>

}

export default AboutUs