import React from 'react'
import { Link } from 'react-router-dom'

const LateralMenu = () => {
    return (
        <div className="Menu">
            <div className="row">
                <div className="col">
                    <div className="botones d-flex flex-column h-100" role="group">
                        <h4>General</h4>
                        <Link className="boton btn" to={"/app"}>
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
                        <Link className="boton btn" to={"/app/clientes"}>
                            <div className="texto-boton">
                                <i className="fa-regular fa-id-badge"></i>&nbsp;&nbsp;Clientes
                            </div>
                        </Link>
                        <Link className="boton btn" to={"/app/reporte"}>
                            <div className="texto-boton">
                                <i className="fa-solid fa-arrow-trend-up"></i>&nbsp;&nbsp;Reportes
                            </div>
                        </Link>
                        <div className='border-top border-2 my-4' style={{ borderTopColor: "#6C11D9" }} />
                        <h4>Acciones Rapidas</h4>
                        <Link className="boton btn" to={'/app/ventas?modalIsOpen=true'}> 
                            <div className="texto-boton">
                                <i class="fa-solid fa-file-medical"></i>&nbsp;&nbsp;Crear Orden
                            </div>
                        </Link>
                        <Link className="boton btn" to={'/app/inventario?modalIsOpen=true'}>
                            <div className="texto-boton">
                                <i class="fa-solid fa-box"></i>&nbsp;&nbsp;Añadir Producto
                            </div>
                        </Link>
                        <Link className="boton btn" to={'/app/clientes?modalIsOpen=true'}>
                            <div className="texto-boton">
                                <i class="fa-solid fa-truck"></i>&nbsp;&nbsp;Añadir Cliente
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default LateralMenu