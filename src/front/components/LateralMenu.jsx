import React from 'react'

const LateralMenu = () => {
    return (
        <div className="Menu">
            <div className="row">
                <div className="col">
                    <div className="botones container">
                        <div className="btn-group-vertical" role="group">
                            <strong>General</strong>
                            <button className="boton btn">
                                <div className="texto-boton">
                                <i className="fa-solid fa-border-all"></i>  Inicio
                                </div>
                            </button>
                            <button className="boton btn">
                                <div className="texto-boton">
                                <i class="fa-solid fa-box"></i> Inventario
                                </div>
                            </button>
                            <button className="boton btn">
                                <div className="texto-boton">
                            <i class="fa-solid fa-cart-shopping"></i> Ventas & Ordenes
                                </div>
                            </button>
                            <button className="boton btn">
                                <div className="texto-boton">
                                <i class="fa-solid fa-arrow-trend-up"></i> Reportes
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <strong>Soporte</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LateralMenu