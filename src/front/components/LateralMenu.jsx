import React from 'react'

const LateralMenu = () => {
    return (
        <div className="Menu">
            <div className="row">
                <div className="col">
                    <strong>General</strong>
                    <div className="botones">
                        <div className="btn-group-vertical" role="group">
                            <button className="boton btn">
                                 <i className="fa-solid fa-border-all"></i> Inicio
                            </button>
                            <button className="boton btn">
                                 <i className="fa-solid fa-border-all"></i> Inicio
                            </button>
                            <button className="boton btn">
                                 <i className="fa-solid fa-border-all"></i> Inicio
                            </button>
                            <button className="boton btn">
                                 <i className="fa-solid fa-border-all"></i> Inicio
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