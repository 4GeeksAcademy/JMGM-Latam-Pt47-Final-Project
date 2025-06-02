import React from 'react'
import { Link } from 'react-router-dom'

const LateralMenu = () => {
    return (
        <div className="Menu h-100">
            <div className="row">
                <div className="col">
                    <div className="botones d-flex flex-column h-100" role="group">
                        <h4 className='fw-bold'>General</h4>
                        <Link className="boton btn" to={"/app"} style={{marginTop:"1rem"}}>
                            <div className="texto-boton">
                                <i className="fa-solid fa-border-all"></i>&nbsp;&nbsp;Inicio
                            </div>
                        </Link>
                        <Link className="boton btn" to={"/app/inventario"}>
                            <div className="texto-boton">
                                <i className="fa-solid fa-box"></i>&nbsp;&nbsp;Inventario
                            </div>
                        </Link>
                        <Link className="boton btn" to={"/app/ventas"}>
                            <div className="texto-boton">
                                <i className="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;Ventas & Ordenes
                            </div>
                        </Link>
                        <Link className="boton btn mb-4" to={"/app/clientes"}>
                            <div className="texto-boton">
                                <i className="fa-regular fa-id-badge"></i>&nbsp;&nbsp;Clientes
                            </div>
                        </Link>
                        <div className='border-top border-2 my-5' style={{ borderTopColor: "#6C11D9" }} />
                        <h4 className="fw-bold">Acciones Rapidas</h4>
                        <Link className="boton btn" to={'/app/ventas?modalIsOpen=true'} style={{marginTop:"1rem"}}> 
                            <div className="texto-boton">
                                <i className="fa-solid fa-file-medical"></i>&nbsp;&nbsp;Crear Orden
                            </div>
                        </Link>
                        <Link className="boton btn" to={'/app/inventario?modalIsOpen=true'}>
                            <div className="texto-boton">
                                <i className="fa-solid fa-box"></i>&nbsp;&nbsp;Añadir Producto
                            </div>
                        </Link>
                        <Link className="boton btn mb-5" to={'/app/clientes?modalIsOpen=true'}>
                            <div className="texto-boton">
                                <i className="fa-solid fa-truck"></i>&nbsp;&nbsp;Añadir Cliente
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default LateralMenu