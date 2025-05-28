import React, { useState, useEffect } from 'react';
import placeholder from "./../assets/img/placeholder.png";
import { useLocation } from 'react-router-dom';
const backend_url = import.meta.env.VITE_BACKEND_URL;

const Clientes = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalIsOpen = JSON.parse(queryParams.get('modalIsOpen')) || false
  console.log(modalIsOpen);

  const [clients, setClients] = useState([])
  const [clientModal, setClientModal] = useState(modalIsOpen)
  const [newClientData, setNewClientData] = useState({
    name: '',
    email: '',
    phone: ''
  })



  const companyClients = () => {

    const accessToken = localStorage.getItem("token")

    if (!accessToken) {
      alert("No hay token de autenticación. Por favor, inicia sesión para añadir productos.")
      return
    }

    fetch(`${backend_url}/clients`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
      .then(resp => resp.json())
      .then((data) => {
        console.log("Success!!", data)
        if (data && Array.isArray(data.clientes)) {
          setClients(data.clientes)
        } else {

          throw new Error("Formato de datos de clientes = ERROR.")
        }
      })
      .catch(error => console.log(error))
  }


  useEffect(() => {
    companyClients()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewClientData(data => ({
      ...data,
      [name]: value
    }))
  }

  const createClientModal = (e) => {
    e.preventDefault()

    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      alert("No hay token de autenticación. Por favor, inicia sesión para añadir productos.")
      return
    }

    fetch(`${backend_url}/client`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(newClientData)
    })
      .then(resp => resp.json())
      .then((data) => {
        console.log(data)
        setClients([...clients, data.clientes])
        setClientModal(false)

      })
      .catch(error => console.log(error))

  }

  //---------------------------------------------------------------------

  return (
    <div className="row me-0">
      <div className="col-9 pe-0">
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgba(244, 245, 252, 1)" }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><h5>Clientes</h5></a>
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
              <button className="boton-cliente btn w-75"
                type="button"
                onClick={() => setClientModal(true)}
              >
                <i className="fa-solid fa-circle-plus"></i>&nbsp;&nbsp;Nuevo Cliente</button>
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
          <tbody className="table-group-divider">
            {clients.length > 0 ? (
              clients.map((clientes) => (
                <tr key={clientes.id}>
                  <td>{clientes.name || 'N/A'}</td>
                  <td>{clientes.email || 'N/A'}</td>
                  <td>{clientes.phone || 'N/A'}</td>
                  {/* <td>{clients.price ||'N/A'}</td>
                  <td>{product.stock || 'N/A'}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No hay clientes.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* modal de paginas/navigation */}
        {/* <div className=" d-flex justify-content-center" style={{ paddingTop: "49%" }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="boton-pagi page-link" href="#">1</a></li>
              <li className="page-item"><a className="boton-pagi page-link" href="#">2</a></li>
              <li className="page-item"><a className="boton-pagi page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div> */}

      </div>
      {/* Columna de Clientes Top y Actividades Recientes */}
      <div className="col-3" style={{ backgroundColor: "rgba(244, 245, 252, 1)" }}>
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
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none", backgroundColor: "rgba(244, 245, 252, 1)" }}>
            <div className='row'>
              <div className='col-2' style={{ paddingTop: "3px" }}>
                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="col">
                <div className='py-3 text-start'>
                  &nbsp;&nbsp;CLIENTNAME - <b className="Texto-ordenes">12 Ordenes</b>
                </div>
              </div>
            </div>
          </div>
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none", backgroundColor: "rgba(244, 245, 252, 1)" }}>
            <div className='row'>
              <div className='col-2' style={{ paddingTop: "3px" }}>
                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="col">
                <div className='py-3 text-start'>
                  &nbsp;&nbsp;CLIENTNAME - <b className="Texto-ordenes">12 Ordenes</b>
                </div>
              </div>
            </div>
          </div>
          {/* Barra de Actividad Reciente */}
          <br />
          <h4>Actividad Reciente</h4>
          <br />
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none", backgroundColor: "rgba(244, 245, 252, 1)" }}>
            <h6 className=''>Ordenó <b className='text-primary'>x</b> productos</h6>
            <div className='row'>
              <div className='col-2' style={{ paddingTop: "3px" }}>
                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="col">
                <div className='py-3 text-start'>
                  &nbsp;&nbsp;CLIENTNAME - <b className="Texto-ordenes">5h atras</b>
                </div>
              </div>
            </div>
          </div>
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none", backgroundColor: "rgba(244, 245, 252, 1)" }}>
            <h6 className=''>Ordenó <b className='text-primary'>x</b> productos</h6>
            <div className='row'>
              <div className='col-2' style={{ paddingTop: "3px" }}>
                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="col">
                <div className='py-3 text-start'>
                  &nbsp;&nbsp;CLIENTNAME - <b className="Texto-ordenes">1m atras</b>
                </div>
              </div>
            </div>
          </div>
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none", backgroundColor: "rgba(244, 245, 252, 1)" }}>
            <h6 className=''>Ordenó <b className='text-primary'>x</b> productos</h6>
            <div className='row'>
              <div className='col-2' style={{ paddingTop: "3px" }}>
                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="col">
                <div className='py-3 text-start'>
                  &nbsp;&nbsp;CLIENTNAME - <b className="Texto-ordenes">30m atras</b>
                </div>
              </div>
            </div>
          </div>
          <div className="card d-flex p-2 text-start px-3" style={{ border: "none", backgroundColor: "rgba(244, 245, 252, 1)" }}>
            <h6 className=''>Ordenó <b className='text-primary'>x</b> productos</h6>
            <div className='row'>
              <div className='col-2' style={{ paddingTop: "3px" }}>
                <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  style={{ width: "50px", height: "50px" }} />
              </div>
              <div className="col">
                <div className='py-3 text-start'>
                  &nbsp;&nbsp;CLIENTNAME - <b className="Texto-ordenes">6m atras</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- Modal para Nuevo Producto --- */}
      {clientModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Añadir Nuevo Producto</h5>
                <button type="button" className="btn-close" onClick={() => setClientModal(false)} ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={createClientModal}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre del Cliente</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={newClientData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={newClientData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={newClientData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {/* <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Cantidad (Stock)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock"
                      name="stock"
                      value={newProductData.stock}
                      onChange={handleInputChange}
                      required
                    /> 
                  </div> */}
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setClientModal(false)}>Cerrar</button>
                    <button type="submit" className="boton-cliente btn ">Guardar Cliente</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Clientes