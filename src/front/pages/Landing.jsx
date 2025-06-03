import React, { useEffect } from 'react'
import LandingBanner from '../components/LandingBanner'
import AboutUs from '../components/AboutUs'

export const Landing = () => {
    useEffect(()=>{
        document.title = "MyStock"
    })
    return (
        <>
            <LandingBanner />
            <div id="features" className='my-4' />
            <div className='pt-4'>
                <h2 className='fw-bold text-center' style={{ color: "#6C11D9" }}>Transforma la manera en la que gestionas tu inventario</h2>
            </div>
            {/* cards */}
            <div className='d-flex p-4 mx-2 justify-content-evenly'>
                <div className="card mb-3 col-4 text-center" style={{ maxWidth: "18rem", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
                    <img src="https://images.unsplash.com/photo-1663018241379-2438babc8638" className="card-img-top" alt="..." style={{ maxHeight: "9.5rem" }} />
                    <div className="card-body">
                        <h5 className="card-title fw-bold">Gestiona tu inventario</h5>
                        <p className="card-text">Como lo dice nuestro nombre, en MyStock puedes gestionar tu inventario de manera sencilla. En nuestra aplicación web accede de manera inmediata a tu inventario y conoce todos sus movimientos, estatus y procesos.</p>
                    </div>
                </div>
                <div className="card mb-3 col-4 text-center" style={{ maxWidth: "18rem", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
                    <img src="https://images.unsplash.com/photo-1642516303080-431f6681f864?" className="card-img-top" alt="..." style={{ maxHeight: "9.5rem" }} />
                    <div className="card-body">
                        <h5 className="card-title fw-bold">Visualiza tus datos</h5>
                        <p className="card-text">Nuestra plataforma te ofrece diversidad de gráficas para visualizar los datos de todas tus operaciones de manera fácil. Ya quieras conocer tus movimientos o disponibilidad de productos, te lo tenemos.</p>
                    </div>
                </div>
                <div className="card mb-3 col-4 text-center" style={{ maxWidth: "18rem", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
                    <img src="https://images.unsplash.com/photo-1618397746666-63405ce5d015" className="card-img-top" alt="..." style={{ maxHeight: "9.5rem" }} />
                    <div className="card-body">
                        <h5 className="card-title fw-bold">Optimiza tus procesos</h5>
                        <p className="card-text">Con todo en un solo lugar no dejes que nada te detenga. 
                            Maximiza la eficacia de tus operaciones accediendo directamente a tu información clave con MyStock
                            Reduciendo al minimo el esfuerzo requerido para cada paso.</p>
                    </div>
                </div>
            </div>
            <div id="about-us">
                <AboutUs></AboutUs>
            </div>
            <h1 className='text-center pb-3 pt-3 mb-0 fw-bold' style={{backgroundColor:"GhostWhite"}}>Preguntas Frecuentes</h1>
            <div className="container" id="faq">
                
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                <b>¿Cómo empiezo a usar&nbsp;MyStock?</b>
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">¡Es muy fácil! Solo crea una cuenta y empieza a usar nuestro servicio.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                <b>¿Tiene algún costo el servicio de&nbsp;MyStock?</b>
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Por los momentos&nbsp;<b>MyStock</b>&nbsp;se encuentra en una fase de prueba abierta gratuita. Esto puede cambiar en el futuro.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                <b>¿Cómo se manejan mis datos y los de mi empresa?</b>
                            </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Toda su información se almacena de manera segura, vinculada a su cuenta, protegida mediante una contraseña encriptada. Solo aquellos con acceso a su contraseña pueden visualizarla.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                               <b> Perdí el acceso a mi cuenta.&nbsp;¿Qué puedo hacer?</b>
                            </button>
                        </h2>
                        <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Dirígete a la sección de iniciar sesión y selecciona&nbsp;<b>Recuperar contraseña</b>.&nbsp;
                            Si has perdido el acceso a tu correo contáctanos a <a className='link'>mystock4geeks@gmail.com</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}