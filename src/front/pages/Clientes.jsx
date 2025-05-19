import React from 'react'
import placeholder from "./../assets/img/placeholder.png"

const Clientes = () => {
  return (
    <div className="row me-0">
      <div className="col-9">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><h5>Clientes</h5></a>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
              <button className="boton-cliente btn w-75" type="submit">
                <i className="fa-solid fa-circle-plus"></i>&nbsp;&nbsp;Editar Cliente</button>
            </form>
          </div>
        </nav>
        {/* Codigo de la Tabla */}
        <table className="table">
          <thead>
            <tr>
              <th className="col table-secondary">Nombre del Cliente</th>
              <th className="col table-secondary">Correo</th>
              <th className="col table-secondary">Teléfono</th>
              <th className="col table-secondary">Historial</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Manuel</th>
              <td>manueld@gmail.com</td>
              <td>595532321</td>
              <td>Ordenes Previas</td>
            </tr>
            <tr>
              <th scope="row">Massimo</th>
              <td>Massi59@gmail.com</td>
              <td>052145214</td>
              <td>Ordenes Previas</td>
            </tr>
            <tr>
              <th scope="row">Gabriel</th>
              <td>Gabriel78@gmail.com</td>
              <td>5221562</td>
              <td>Ordenes Previas</td>
            </tr>
            <tr>
              <th scope="row">Jorge</th>
              <td>Jorgef98@gmail.com</td>
              <td>6325511</td>
              <td>Ordenes Previas</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Columna de Clientes Top y Actividades Recientes */}
      <div className="col-3">
        <div className="clientes-top d-flex flex-column justify-content-between" role="group">
          <h5>Clientes Top</h5>
          <button class="boton-cliente btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Ultimos 7 Dias
          </button>
          <ul className="dropdown-menu dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
          <div className="card mb-3" style={{ maxWidth: "18rem", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
            <img src={placeholder} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title fw-bold">Primary card title</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu viverra sem, in gravida velit. Quisque faucibus rutrum velit, eu molestie dolor interdum sed. Donec elementum tristique vehicula. Nulla consequat laoreet sapien, ac ornare ligula molestie quis.</p>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  )
}

export default Clientes