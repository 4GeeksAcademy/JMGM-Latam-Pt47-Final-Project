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
          <h4>Clientes Top</h4>
          <div className='d-flex justify-content-center' style={{ paddingBottom: "5px", paddingTop: "5px" }}>
            <button className="boton-cliente btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Ultimos 7 Dias
              <ul className="dropdown-menu dropdown-menu">
                <li><a className="dropdown-item" href="#">Últimos 7 dias</a></li>
                <li><a className="dropdown-item" href="#">Último mes</a></li>
              </ul>
            </button>
          </div>
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none" }}>
            <div className='row'>
              <div className='col-2' style={{ paddingTop: "3px" }}>
                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="col">
                <div className='py-3 text-start'>
                  &nbsp;&nbsp;CLIENTNAME - <b className='text-primary'>12 Ordenes</b>
                </div>
              </div>
            </div>
          </div>
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none" }}>
            <div className='row'>
              <div className='col-2' style={{ paddingTop: "3px" }}>
                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="col">
                <div className='py-3 text-start'>
                  &nbsp;&nbsp;CLIENTNAME - <b className='text-primary'>12 Ordenes</b>
                </div>
              </div>
            </div>
          </div>
          {/* Barra de Actividad Reciente */}
          <br />
          <h4>Actividad Reciente</h4>
          <br />
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none" }}>
            <h6 className=''>Ordenó <b className='text-primary'>x</b> productos</h6>
            <div className='row'>
              <div className='col-2' style={{ paddingTop: "3px" }}>
                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="col">
                <div className='py-3 text-start'>
                  &nbsp;&nbsp;CLIENTNAME - <b className='text-primary'>5h atras</b>
                </div>
              </div>
            </div>
          </div>
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none" }}>
            <h6 className=''>Ordenó <b className='text-primary'>x</b> productos</h6>
            <div className='row'>
              <div className='col-2' style={{ paddingTop: "3px" }}>
                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="col">
                <div className='py-3 text-start'>
                  &nbsp;&nbsp;CLIENTNAME - <b className='text-primary'>1m atras</b>
                </div>
              </div>
            </div>
          </div>
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none" }}>
            <h6 className=''>Ordenó <b className='text-primary'>x</b> productos</h6>
            <div className='row'>
              <div className='col-2' style={{ paddingTop: "3px" }}>
                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="col">
                <div className='py-3 text-start'>
                  &nbsp;&nbsp;CLIENTNAME - <b className='text-primary'>30m atras</b>
                </div>
              </div>
            </div>
          </div>
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none" }}>
            <h6 className=''>Ordenó <b className='text-primary'>x</b> productos</h6>
            <div className='row'>
              <div className='col-2' style={{ paddingTop: "3px" }}>
                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="col">
                <div className='py-3 text-start'>
                  &nbsp;&nbsp;CLIENTNAME - <b className='text-primary'>6m atras</b>
                </div>
              </div>
            </div>
          </div>
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none" }}>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clientes