import React from 'react'

const LateralMenu = () => {
    return (
        <div className="Menu">
            <div className="row">
                <div className="col">
                    <div className="botones d-flex flex-column justify-content-between" role="group">
                        <h5>General</h5>
                        <button className="boton btn w-75">
                            <div className="texto-boton">
                                <i className="fa-solid fa-border-all"></i>&nbsp;&nbsp;Inicio
                            </div>
                        </button>
                        <button className="boton btn">
                            <div className="texto-boton">
                                <i class="fa-solid fa-box"></i>&nbsp;&nbsp;Inventario
                            </div>
                        </button>
                        <button className="boton btn">
                            <div className="texto-boton">
                                <i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;Ventas & Ordenes
                            </div>
                        </button>
                        <button className="boton btn">
                            <div className="texto-boton">
                                <i class="fa-solid fa-arrow-trend-up"></i>&nbsp;&nbsp;Reportes
                            </div>
                        </button>
                        <br></br>
                        <h5>Soporte</h5>
                        <button className="boton btn">
                            <div className="texto-boton">
                                <i class="fa-solid fa-circle-info"></i>&nbsp;&nbsp;Ayuda
                            </div>
                        </button>
                        <button className="boton btn">
                            <div className="texto-boton">
                                <i class="fa-solid fa-gear"></i>&nbsp;&nbsp;Opciones
                            </div>
                        </button>
                        <div className='border-top border-2 my-4' style={{ borderTopColor: "#6C11D9" }} />
                        <h5>Acciones Rapidas</h5>
                        <button className="boton btn">
                            <div className="texto-boton">
                                <i class="fa-solid fa-file-medical"></i>&nbsp;&nbsp;Crear Orden
                            </div>
                        </button>
                        <button className="boton btn">
                            <div className="texto-boton">
                                <i class="fa-solid fa-box"></i>&nbsp;&nbsp;Añadir Producto
                            </div>
                        </button>
                        <button className="boton btn">
                            <div className="texto-boton">
                                <i class="fa-solid fa-truck"></i>&nbsp;&nbsp;Añadir Cliente
                            </div>
                        </button>
                        <button className="boton btn">
                            <div className="texto-boton">
                                <i class="fa-solid fa-arrow-up-from-bracket"></i>&nbsp;&nbsp;Exportar
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LateralMenu