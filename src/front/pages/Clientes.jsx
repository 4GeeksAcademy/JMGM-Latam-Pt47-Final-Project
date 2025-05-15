import React from 'react'

const Clientes = () => {
  return (
    <div className="row">
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
    <div className="col-3">
      sjsjsjs
    </div>
    </div>
  )
}

export default Clientes