
import React, { useEffect, useState } from 'react';
import { SummaryCard } from '../components/SummaryCard'
import { BarChart } from '@mui/x-charts/BarChart';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
const backend_url = import.meta.env.VITE_BACKEND_URL;

const Ventas = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalIsOpen = JSON.parse(queryParams.get('modalIsOpen')) || false

  const [clients, setClients] = useState([])
  const navigate = useNavigate()
  const [compras, setCompras] = useState([])
  const [nombreProd, setnombreProd] = useState([])
  const [cantidadProd, setcantidadProd] = useState([])
  const [comprasModal, setComprasModal] = useState(modalIsOpen)
  const [newComprasData, setNewComprasData] = useState({
    product_name: '',
    cantidad: ''
  })
  const companyVentas = () => {

    const accessToken = localStorage.getItem("token")

    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "Opps...",
        text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
      });
      return
    }

    fetch(`${backend_url}/compras`, {
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
        if (data && Array.isArray(data.compras)) {
          setCompras(data.compras)
          let nombres = []
          let cantidades = []
          for (let i = 0; i < data.compras.length; i++) {
            if(!nombres.includes(data.compras[i].producto.product_name)){
              nombres.push(data.compras[i].producto.product_name)
              cantidades.push(data.compras[i].cantidad)
            } else {
              let currentIndex = nombres.indexOf(data.compras[i].producto.product_name)
              cantidades[currentIndex] = cantidades[currentIndex] + data.compras[i].cantidad
            }
            
          }
          setnombreProd(nombres)
          setcantidadProd(cantidades)
          console.log(nombres)
          console.log(cantidades)
        } else {

          throw new Error("Formato de datos de compras = ERROR.")
        }
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    companyVentas()
  }, [])

  console.log(compras)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewComprasData(data => ({
      ...data,
      [name]: value
    }))
  }

  const createComprasModal = (e) => {
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
    if (!newComprasData.client_id) {
      alert("Por favor, selecciona un cliente.")
      return
    }
    const clientToUse = newComprasData.client_id
    console.log(newComprasData);

    fetch(`${backend_url}/compra/${clientToUse}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        product_name: newComprasData.product_name,
        cantidad: newComprasData.cantidad
      })
    })
      .then(resp => resp.json())
      .then((data) => {
        if (data.ok) {
          Swal.fire({
            title: "Compra creada exitosamente!",
            icon: "success",
            draggable: true
          });
          setComprasModal(false);
          setNewComprasData({ product_name: '', cantidad: '', fecha_compra: '' })
          companyVentas()
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Algo ocurrió!",
            text: (data.error),
          });
        }
      })
      .catch(error => {
        console.error("Error en la operación de creación de compra:", error)
        setComprasModal(false)
        setNewComprasData({ product_name: '', cantidad: '', fecha_compra: '' })
        alert("Hubo un error inesperado al crear la compra. Por favor, intenta de nuevo.")
      })
  }
  //-----------------------------------------------------------

  const margin = { right: 24 };
  const ventas =  cantidadProd;
  const xLabels = nombreProd;

  const companyClients = () => {

    const accessToken = localStorage.getItem("token")

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
          if (resp.status == 401) {
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


  useEffect(() => {
    companyClients()
  }, [])

  //----------------------------------------------------------------------------------------------------
  return (
    <div className="row me-0 h-100">
      <div className="col-12 pe-0">
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgba(244, 245, 252, 1)" }}>
          <div className="container-fluid">
            <h3 className='fw-bold pt-2'>Ordenes de Venta</h3>
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <button className="boton-cliente btn w-100"
                type="button"
                onClick={() => setComprasModal(true)}>
                <i className="fa-solid fa-circle-plus"></i>&nbsp;&nbsp;Nueva Orden</button>
            </form>
          </div>
        </nav>
        {/* Codigo de la Tabla */}
        <table className="table table-striped table-hover table-borderless">
          <thead>
            <tr className='bg-secondary-subtle fs-5'>
              <th className="col ps-3 tabla-resumen">Nombre del Producto</th>
              <th className="col tabla-resumen">Cliente</th>
              <th className="col tabla-resumen">Número de Órden</th>
              <th className="col tabla-resumen">Fecha</th>
              <th className="col tabla-resumen">Cantidad productos</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {compras.length > 0 ? (
              compras.map((compras) => (
                <tr key={compras.id}>
                  <td className='ps-3'>{compras.producto && compras.producto.product_name ? compras.producto.product_name : 'N/A'}</td>
                  <td>{compras.cliente.name || 'N/A'}</td>
                  <td>{compras.id || 'N/A'}</td>
                  <td>{compras.fecha_compra || 'N/A'}</td>
                  <td>{compras.cantidad || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No hay ventas.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='border-top border-2' style={{ borderTopColor: "#6C11D9" }} />
        <div className='graph pe-3 w-100 my-4 graph me-auto'>
          <div className='col me-auto d-flex justify-content-between'>
            <h4 className='fw-bold' style={{ paddingBottom: "70px" }}>&nbsp;&nbsp;Reporte de Ventas</h4>
            <p> <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg">
              <circle r="10" cx="10" cy="10" fill="deepskyblue" />
            </svg> <b style={{ color: "deepskyblue" }}>Ventas totales por cantidad</b> &nbsp;&nbsp;
            </p>
          </div>
          <div className='the-graph-itself'>
            <BarChart
              height={300}
              series={[
                { data: ventas, color: 'deepskyblue'},
              ]}
              xAxis={[{ data: xLabels }]}
              yAxis={[{ width: 50 }]}
              margin={margin}
            />
          </div>
        </div>
      </div>
      {/* --- Modal para Nuevo Producto --- */}
      {comprasModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Añadir Nueva Compra</h5>
                <button type="button" className="btn-close" onClick={() => setComprasModal(false)} ></button>
              </div>

              <div className="modal-body">
                <form onSubmit={createComprasModal}>
                  <div className="mb-3">
                    <label htmlFor="client_id" className="form-label">Seleccionar Cliente</label>
                    <select
                      className="form-select"
                      id="client_id"
                      name="client_id"
                      value={newComprasData.client_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Selecciona un cliente...</option>
                      {clients.length > 0 ? (
                        clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name} {client.last_name ? client.last_name : ''}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>Cargando clientes o no hay clientes</option>
                      )}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="product_name" className="form-label">Nombre del producto</label>
                    <input
                      type="text"
                      className="form-control"
                      id="product_name"
                      name="product_name"
                      value={newComprasData.product_name}
                      onChange={(e) => setNewComprasData({ ...newComprasData, product_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cantidad"
                      name="cantidad"
                      value={newComprasData.cantidad}
                      onChange={(e) => setNewComprasData({ ...newComprasData, cantidad: e.target.value })}
                    />
                  </div>
                  {/* <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={newComprasData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div> */}
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setComprasModal(false)}>Cerrar</button>
                    <button type="submit" className="boton-cliente btn ">Registrar Venta</button>
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

export default Ventas