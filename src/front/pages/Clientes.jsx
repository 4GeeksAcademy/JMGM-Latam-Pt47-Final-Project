import React, { useState, useEffect } from 'react';
import placeholder from "./../assets/img/placeholder.png";
import { useLocation, useNavigate } from 'react-router-dom';
const backend_url = import.meta.env.VITE_BACKEND_URL;

const Clientes = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalIsOpen = JSON.parse(queryParams.get('modalIsOpen')) || false
  const navigate = useNavigate()
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
      .then(resp => {
        if (!resp.ok) {
          if (resp.status === 401) {
            alert("Tu sesión ha expirado o es inválida. Por favor, inicia sesión de nuevo.")
            localStorage.removeItem("token")
            navigate("/")
          }
          throw new Error(`Error HTTP: ${resp.status}`)
        }
        return resp.json()
      })
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

    if (!newClientData.name || !newClientData.email || !newClientData.phone) {
      alert("Por favor, rellena todos los campos obligatorios: Nombre, Email, Teléfono.")
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
    //preguntar-------------------------
      .then(resp => {
        if (!resp.ok) {
          return resp.json()
          .then(errorData => {
            let errorMessage = "Error al crear cliente: ";
            if (resp.status == 409) {
              if (errorData.field == 'email') {
                errorMessage += "El correo electrónico ya está registrado."
              } else if (errorData.field == 'phone') {
                errorMessage += "El número de teléfono ya está registrado."
              } else if (errorData.field == 'name') {
                errorMessage += "El nombre ya está registrado."
              } else {
                errorMessage += errorData
              }
              setNewClientData({ name: '', email: '', phone: '' })
              alert(errorMessage)
            } else if (resp.status === 401) {
              alert("Tu sesión ha expirado o es inválida. Por favor, inicia sesión de nuevo.")
              localStorage.removeItem("token")
            } else {
              alert(errorMessage + (errorData.msg))
            }
            throw new Error("Error en la respuesta del servidor al crear cliente.")
          })
        }
        return resp.json()
      })
      .then((data) => {
        console.log("Respuesta de creación de cliente:", data)
        companyClients()
        alert("Cliente creado exitosamente!")
        setClientModal(false)
        setNewClientData({ name: '', email: '', phone: '' })

      })
      .catch(error => {
        console.error("Error al crear el cliente:", error)
        setClientModal(false)
        setNewClientData({ name: '', email: '', phone: '' })
      })

  }


  //---------------------------------------------------------------------

  return (
    <div className="row me-0">
      <div className="col-12 pe-0">
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgba(244, 245, 252, 1)" }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><h4>Clientes</h4></a>
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <button className="boton-cliente btn w-100"

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