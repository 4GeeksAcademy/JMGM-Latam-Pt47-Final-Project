import React, { useEffect, useState } from 'react'
import { SummaryCard } from '../components/SummaryCard'
import { BarChart } from '@mui/x-charts/BarChart';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Dashboard = () => {

  const [inventory, setInventory] = useState([])
  const [invMes, setInvMes] = useState([])
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

  const comprasMensual = () => {

    let accessToken = localStorage.getItem("token")
    if (!accessToken) {
      setError("No se encontró el token de autenticación. Por favor, inicia sesión.")
      setLoading(false)
      return
    }

    fetch(`${backendUrl}/compras`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
      .then(resp => resp.json())
      .then((data) => {
        console.log("Success!!", data)
        if (data && Array.isArray(data.mes_compra)) {
          setInvMes(data.mes_compra)
        } else {

          throw new Error("Formato de datos de inventario inesperado del servidor.")
        }
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    companyInventory()
    comprasMensual()
  }, []);
  let result = inventory.map(a => a.stock);
  console.log(result);
// Aqui hace falta: 1-Extraer el monto del inventario[✓] 2-las cantidades de cada compra[✓] 3-sumar todas las del mes[]
  const invSum = result.reduce((partialSum, a) => partialSum + a, 0);
  console.log(invSum);
  console.log(invMes);

    const entradas = {
    data: invMes,
    color: 'deepskyblue'
  };
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
        <div className='graph pe-3 w-100 mx-auto'>
          <div className='col me-auto d-flex justify-content-between'>
            <h4 className='fw-bold'>Reporte de inventario</h4>
            <p> <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg">
              <circle r="10" cx="10" cy="10" fill="deepskyblue" />
            </svg> <b style={{ color: "deepskyblue" }}>Compras por mes</b> &nbsp;&nbsp;</p>
          </div>
          <div className='the-graph-itself w-75 mx-auto'>
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                }]}
              series={[
                { ...entradas },
              ]}
              height={300}
            />
          </div>
        </div>
      </div>
      <div className='sales-summary'>
        <div className='d-flex justify-content-between'>
          <h4 className='fw-bold px-3'>Resumen de Ventas y Órdenes</h4>
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
