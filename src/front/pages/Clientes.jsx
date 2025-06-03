import React, { useState, useEffect } from 'react';
import placeholder from "./../assets/img/placeholder.png";
import { useLocation, useNavigate } from 'react-router-dom';
const backend_url = import.meta.env.VITE_BACKEND_URL;

const Clientes = () => {

  const location = useLocation()
  const accessToken = localStorage.getItem("token")
  const queryParams = new URLSearchParams(location.search)
  const modalIsOpen = JSON.parse(queryParams.get('modalIsOpen')) || false
  const navigate = useNavigate()
  const [clients, setClients] = useState([])
  const [clientDelete, setClientDelete] = useState(null);
  const [clientModal, setClientModal] = useState(modalIsOpen)
  const [newClientData, setNewClientData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [editClient, setEditClient] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const editarCliente = (client) => {
    setEditClient(client)
  }

  const deleteCLients = (client) => {
    setClientDelete(client);
  };
  function edit() {
    fetch(`${backend_url}/client/${editClient.id}`, {
      method: 'PUT',
      body: JSON.stringify(editClient),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + `${accessToken}`
      }

    }

    )
      .then((response) => { return response.json() })
      .then((data) => {
        if (data.ok) {
          Swal.fire({
            title: "Cliente actualizado correctamente!",
            icon: "success",
            draggable: true
          });
          companyClients();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al actualizar cliente!",
          });
        }
      })
      .catch(() => { })
  }
  const companyClients = () => {
    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "Opps...",
        text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
      });
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
            Swal.fire({
              icon: "error",
              title: "Opps...",
              text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
            });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewClientData(data => ({
      ...data,
      [name]: value
    }))
  }

  const createClientModal = (e) => {
    e.preventDefault()

    const accessToken = localStorage.getItem("token")

    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "Opps...",
        text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
      });
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
                if (errorData == 'email') {
                  errorMessage + "El correo electrónico ya está registrado."
                } else if (errorData == 'phone') {
                  errorMessage + "El número de teléfono ya está registrado."
                } else {
                  errorMessage + errorData
                }
                setNewClientData({ name: '', email: '', phone: '' })
                Swal.fire({
                  icon: "error",
                  title: "Error al crear cliente!",
                  text: (errorData.msg),
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error al crear cliente!",
                  text: (errorData.msg),
                });
              }
              throw new Error("Error en la respuesta del servidor al crear cliente.")
            })
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
                Swal.fire({
                  icon: "error",
                  title: "Opps...",
                  text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
                });
                localStorage.removeItem("token")
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error al crear cliente!",
                  text: (errorData.msg),
                });
              }
              throw new Error("Error en la respuesta del servidor al crear cliente.")
            })
        }
        return resp.json()
      })
      .then((data) => {
        console.log("Respuesta de creación de cliente:", data)
        companyClients()
        Swal.fire({
          title: "Cliente creado exitosamente!",
          icon: "success",
          draggable: true
        });
        setClientModal(false)
        setNewClientData({ name: '', email: '', phone: '' })

      })
      .catch(error => {
        console.error("Error al crear el cliente:", error)
        setClientModal(false)
        setNewClientData({ name: '', email: '', phone: '' })
      })

  }
  useEffect(() => {
    companyClients()
  }, [])
  const eliminarCliente = () => {
    if (!clientDelete) return;
    fetch(`${backend_url}/client/${clientDelete.id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer " + `${accessToken}`
      }
    })
      .then((response) => { return response.json() })
      .then((data) => {
        if (data.ok) {
          Swal.fire({
            title: "Cliente eliminado correctamente!",
            icon: "success",
            draggable: true
          });
          setClients(clients.filter(p => p.id !== clientDelete.id))
          setClientDelete(null)
        } else {
          return (
            Swal.fire({
              icon: "error",
              title: "Error al eliminar cliente!",
              text: (data.msg),
              footer: '<a href="#">Why do I have this issue?</a>'
            }))
        }

      })
      .catch((err) => { return err })
  }



  //---------------------------------------------------------------------

  return (
    <div className="row me-0">
      <div className="col-12 pe-0">
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgba(244, 245, 252, 1)" }}>
          <div className="container-fluid">
            <h3 className='fw-bold pt-2'>Clientes</h3>
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
        <table className="table table-striped table-hover table-borderless">
          <thead>
            <tr className='bg-secondary-subtle fs-5'>
              <th className="ps-3 col tabla-resumen">Nombre del Cliente</th>
              <th className="col tabla-resumen">Correo</th>
              <th className="col tabla-resumen">Teléfono</th>
              <th className="col tabla-resumen"></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {clients.length > 0 ? (
              clients.map((clientes) => (
                <tr key={clientes.id}>
                  <td className=' ps-3'>{clientes.name || 'N/A'}</td>
                  <td>{clientes.email || 'N/A'}</td>
                  <td>{clientes.phone || 'N/A'}</td>
                                    <td className='p-0 text-center'>
                  <button
                    type="button"
                    onClick={() => deleteCLients(clientes)}
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button type="button"
                    className="btn"
                    onClick={() => editarCliente(clientes)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1">
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  </td>
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
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar Cliente</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <h4>¿Seguro que desea eliminar este cliente?</h4>
                  <p><strong>Cliente:</strong> {clientDelete?.name}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={eliminarCliente}
                    data-bs-dismiss="modal"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </table>
        <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Editar CLiente</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="container">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  type="text"
                  value={editClient.name}
                  onChange={(e) => setEditClient({ ...editClient, name: e.target.value })}
                  className="form-control"
                  id="name"
                  name="name"
                  required
                />
                <label htmlFor="name" className="form-label">Email</label>
                <input
                  type="text"
                  value={editClient.email}
                  onChange={(e) => setEditClient({ ...editClient, email: e.target.value })}
                  className="form-control"
                  id="name"
                  name="name"
                  required
                />
                <label htmlFor="name" className="form-label">Phone</label>
                <input
                  type="text"
                  value={editClient.phone}
                  onChange={(e) => setEditClient({ ...editClient, phone: e.target.value })}
                  className="form-control"
                  id="name"
                  name="name"
                  required
                />
              </div>
              <div className="modal-footer mt-3">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"
                  data-bs-dismiss="modal"
                  onClick={() => edit()}
                  className="btn boton-cliente">Save changes</button>
              </div>
            </div>
          </div>
        </div>

      </div>
      {clientModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Añadir Nuevo Cliente</h5>
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
