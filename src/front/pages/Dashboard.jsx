import React, { useEffect, useState } from 'react'
import { SummaryCard } from '../components/SummaryCard'
import { BarChart } from '@mui/x-charts/BarChart';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Dashboard = () => {
  const entradas = {
    data: [2, 3, 1, 4, 5, 9, 4, 1, 8, 1, 3, 4],
    color: 'deepskyblue'
  };
  const salidas = {
    data: [3, 1, 4, 2, 10, 4, 5, 6, 7, 5, 3, 1],
    color: 'blueviolet'
  };
  const [inventory, setInventory] = useState([])
  const { store, dispatch } = useGlobalReducer()
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const companyInventory = () => {

    let accessToken = localStorage.getItem("token")
    if (!accessToken) {
      setError("No se encontró el token de autenticación. Por favor, inicia sesión.")
      setLoading(false)
      return
    }

    fetch(`${backendUrl}/company/inventory`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
      .then(resp => resp.json())
      .then((data) => {
        console.log("Success!!", data)
        if (data && Array.isArray(data.inventory)) {
          setInventory(data.inventory)
        } else {

          throw new Error("Formato de datos de inventario inesperado del servidor.")
        }
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    companyInventory()
  }, []);
  let result = inventory.map(a => a.stock);
  console.log(result);

  const invSum = result.reduce((partialSum, a) => partialSum + a, 0);
  console.log(invSum);

  return (
    <>
      <div className='py-3 px-5' style={{ backgroundColor: "#F4F5FC" }}>
        <h3 className='fw-bold'>Resumen general</h3>
        <div className='d-flex justify-content-between'>
          <div className="card d-flex p-2 text-start px-4" style={{ width: "49%", height: "20%" }}>
            <div className='d-flex'>
              <div className='mx-2 my-3 rounded-circle text-center' style={{ width: "50px", height: "50px", backgroundColor: "#E7F8FC" }}>
                <i className="fa-solid fa-chart-simple my-3" style={{ color: "#04B4FC" }} />
              </div>
              <div className="col">
                <div className='mx-3 py-3 text-start text-body-secondary fw-medium'>
                  <b className='fw-semibold'>{Math.floor(Math.random() * 10000000)}&nbsp;Bs.D.</b>
                  <br />
                  <p className='mb-0'> Ventas de hoy</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card d-flex p-2 text-start px-4" style={{ width: "49%", height: "20%" }}>
            <div className='d-flex'>
              <div className='mx-2 my-3 rounded-circle text-center' style={{ width: "50px", height: "50px", backgroundColor: "#FCE0EC" }}>
                <i className="fa-solid fa-warehouse my-3" style={{ color: "#FB407D" }} />
              </div>
              <div className="col">
                <div className='mx-3 py-3 text-start text-body-secondary fw-medium'>
                  <b className='fw-semibold'>{invSum}</b>
                  <br />
                  <p className='mb-0'> Productos en inventario</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex p-3'>
        <div className='graph pe-3 w-75 graph me-auto'>
          <div className='col me-auto d-flex justify-content-between'>
            <h4 className='fw-bold'>Reporte de inventario</h4>
            <p> <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg">
              <circle r="10" cx="10" cy="10" fill="deepskyblue" />
            </svg> <b style={{ color: "deepskyblue" }}>Entradas</b> &nbsp;&nbsp; <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                <circle r="10" cx="10" cy="10" fill="blueviolet" />
              </svg> <b style={{ color: "blueviolet" }}>Salidas</b> </p>
          </div>
          <div className='the-graph-itself'>
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                }]}
              series={[
                { ...entradas, stack: 'total' },
                { ...salidas, stack: 'total' }
              ]}
              height={300}
            />
          </div>
        </div>
        <div className='border-start px-2' />
        <div className='notif col-4'>
          <div>
            <h4 className='fw-bold'>Notificaciones</h4>
          </div>
          <div className='notification-feed'>
            <p><i className="fa-solid fa-bell" style={{ color: "#FF9500" }} /> &nbsp; ALERTA DE EJEMPLO ALERTA</p>
          </div>
        </div>
      </div>
      <div className='sales-summary'>
        <div className='d-flex justify-content-between'>
          <h4 className='fw-bold px-3'>Reporte de inventario</h4>
          <select className="form-select w-25 p-1 m-1" aria-label="Default select example">
            <option value="1">Últimos 7 días</option>
            <option value="2">Últimos 14 días</option>
            <option value="3">Último mes</option>
          </select>
        </div>
        <div>
          <table className="table table-borderless table-hover" style={{ color: "#5C6F88" }}>
            <thead>
              <tr className='table-secondary encabezado-tabla tabla-resumen px-3'>
                <th scope="col" className='ps-3'>Canal</th>
                <th scope="col">Preseleccionadas</th>
                <th scope="col">Confirmadas</th>
                <th scope="col">Empacadas</th>
                <th scope="col">Enviadas</th>
                <th scope="col">Facturadas</th>
                <th scope="col">Más vendidas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row" className='ps-3'>Venta Directa</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>Banana ICell 2</td>
              </tr>
              <tr>
                <td scope="row" className='ps-3'>Mayoristas</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>iPack Earth 12</td>
              </tr>
              <tr>
                <td scope="row" className='ps-3'>Minoristas</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>SamZung Universe 2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
