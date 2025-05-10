import React from 'react'

const LateralMenu = () => {
    return (
        <div className="Menu">
            <div className="row">
                <div className="col">
                    <div className="botones d-flex flex-column justify-content-between" role="group">
                        <strong>General</strong>
                        <button className="boton btn">
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
                    </div>
                    <div className="botones">
                        <strong>Soporte</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LateralMenu