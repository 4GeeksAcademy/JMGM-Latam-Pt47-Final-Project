
import React, { useEffect, useState } from 'react';
import { SummaryCard } from '../components/SummaryCard'
import { LineChart } from '@mui/x-charts/LineChart';
import { useLocation, useNavigate } from 'react-router-dom';
const backend_url = import.meta.env.VITE_BACKEND_URL;

const Ventas = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalIsOpen = JSON.parse(queryParams.get('modalIsOpen')) || false

  const navigate = useNavigate()
  const [compras, setCompras] = useState([])
  const [comprasModal, setComprasModal] = useState(modalIsOpen)
  const [newComprasData, setNewComprasData] = useState({
    product_name: '',
    cantidad: ''
  })
  const companyVentas = () => {

    const accessToken = localStorage.getItem("token")

    if (!accessToken) {
      alert("No hay token de autenticación. Por favor, inicia sesión para añadir productos.");
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
        if (data && Array.isArray(data.compras)) {
          setCompras(data.compras)
        } else {

          throw new Error("Formato de datos de compras = ERROR.")
        }
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    companyVentas()
  }, [])

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setNewComprasData(data => ({
  //     ...data,
  //     [name]: value
  //   }))
  // }

  const createComprasModal = (e) => {
    e.preventDefault()

    const accessToken = localStorage.getItem("token")

    if (!accessToken) {
      alert("No hay token de autenticación. Por favor, inicia sesión para añadir productos.")
      return
    }

    const clientId = localStorage.getItem("clientId")
    if (!clientId) {
      alert("No hay ID de cliente disponible. Por favor, asegúrate de tener un cliente seleccionado.")
      return;
    }
    fetch(`${backend_url}/compra/${clientId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        product_id: newComprasData.product_name, 
        cantidad: newComprasData.cantidad
      })
    })
      .then(resp => resp.json())
      .then((data) => {
        console.log(data)
        alert("Compra creada exitosamente!");
        setComprasModal(false);
        setNewComprasData({ product_name: '', cantidad: '', fecha_compra: '' })

      })
      .catch(error => {
        console.error("Error en la operación de creación de compra:", error)
        setComprasModal(false);
        setNewComprasData({ product_name: '', cantidad: '', fecha_compra: '' })
        alert("Hubo un error inesperado al crear la compra. Por favor, intenta de nuevo.")
      })
  }
  //-----------------------------------------------------------

  const margin = { right: 24 };
  const ventasDirectas = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 2780, 1890, 2390, 3490];
  const alDetal = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 1398, 9800, 3908, 4800];
  const alMayor = [3908, 4800, 3800, 4300, 2400, 1398, 9800, 3800, 4300, 2400, 1398];
  const xLabels = [
    'Ene',
    'Feb',
    'Mar',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];



  //----------------------------------------------------------------------------------------------------
  return (
    <div className="row me-0 h-100">
      <div className="col-12 pe-0">
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgba(244, 245, 252, 1)" }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><h4>Ordenes de Venta</h4></a>
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <button className="boton-cliente btn w-100"
                type="button"
                onClick={() => setComprasModal(true)}
              >
                <i className="fa-solid fa-circle-plus"></i>&nbsp;&nbsp;Nueva Orden</button>
            </form>
          </div>
        </nav>
        {/* Codigo de la Tabla */}
        <table className="table">
          <thead>
            <tr>
              <th className="col table-secondary">Nombre del Producto</th>
              <th className="col table-secondary">Codigo Orden</th>
              <th className="col table-secondary">Categoria</th>
              <th className="col table-secondary">Cantidad</th>
              <th className="col table-secondary">Precio Total</th>
              <th className="col table-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Ultimos 7 Dias
                <ul className="dropdown-menu dropdown-menu">
                  <li><a className="dropdown-item" href="#">Últimos 7 dias</a></li>
                  <li><a className="dropdown-item" href="#">Último mes</a></li>
                </ul>
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {compras.length > 0 ? (
              compras.map((compras) => (
                <tr key={compras.id}>
                  <td>{compras.producto && compras.producto.product_name ? compras.producto.product_name : 'N/A'}</td>
                  <td>{compras.clientsId || 'N/A'}</td>
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
        {/* <div className="d-flex justify-content-center">
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
        <div className='border-top border-2' style={{ borderTopColor: "#6C11D9" }} />
        <div className='graph pe-3 w-100 my-4 graph me-auto'>
          <div className='col me-auto d-flex justify-content-between'>
            <h4 className='fw-bold' style={{ paddingBottom: "70px" }}>&nbsp;&nbsp;Reporte de Ventas</h4>
            <p> <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg">
              <circle r="10" cx="10" cy="10" fill="deepskyblue" />
            </svg> <b style={{ color: "deepskyblue" }}>Ventas Directas</b> &nbsp;&nbsp;
              <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                <circle r="10" cx="10" cy="10" fill="blueviolet" />
              </svg> <b style={{ color: "blueviolet" }}>Al Detal</b> &nbsp;&nbsp;
              <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                <circle r="10" cx="10" cy="10" fill="red" />
              </svg> <b style={{ color: "red" }}>Al Mayor</b>
            </p>
          </div>
          <div className='the-graph-itself'>
            <LineChart
              height={300}
              series={[
                { data: ventasDirectas, label: 'Directas' },
                { data: alMayor, label: 'Mayor' },
                { data: alDetal, label: 'Detal' },
              ]}
              xAxis={[{ scaleType: 'point', data: xLabels }]}
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
                    <button type="submit" className="boton-cliente btn ">Guardar Crompa</button>
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