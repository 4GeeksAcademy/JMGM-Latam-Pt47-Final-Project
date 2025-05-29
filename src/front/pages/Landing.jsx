import React from 'react'
import LandingBanner from '../components/LandingBanner'
import AboutUs from '../components/AboutUs'

export const Landing = () => {
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
                        <p className="card-text">Nuestra plataforma te ofrece diversidad de gráficas para visualizar los datos de todas tus operaciones de manera facil. Ya quieras conocer tus movimientos o disponibilidad de productos, te lo tenemos.</p>
                    </div>
                </div>
                <div className="card mb-3 col-4 text-center" style={{ maxWidth: "18rem", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
                    <img src="https://images.unsplash.com/photo-1618397746666-63405ce5d015" className="card-img-top" alt="..." style={{ maxHeight: "9.5rem" }} />
                    <div className="card-body">
                        <h5 className="card-title fw-bold">Optimiza tus procesos</h5>
                        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu viverra sem, in gravida velit. Quisque faucibus rutrum velit, eu molestie dolor interdum sed. Donec elementum tristique vehicula. Nulla consequat laoreet sapien, ac ornare ligula molestie quis.</p>
                    </div>
                </div>
            </div>
            <div id="about-us">
                <AboutUs></AboutUs>
            </div>
            <div className="container mt-4" id="faq">
                <h1 className='text-center pb-3'>Preguntas Frecuentes</h1>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                <b>¿Cómo empiezo a usar&nbsp;MyStock?</b>
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item’s accordion body.</div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                <b>¿Tiene algún costo el servicio de&nbsp;MyStock?</b>
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item’s accordion body. Let’s imagine this being filled with some actual content.</div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                <b>¿Cómo se manejan mis datos y los de mi empresa?</b>
                            </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item’s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                               <b> Perdí el acceso a mi cuenta.&nbsp;¿Qué puedo hacer?</b>
                            </button>
                        </h2>
                        <div id="flush-collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Verga pana esta trancado jaja</div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}