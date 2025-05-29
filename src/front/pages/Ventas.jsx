
import React, { useEffect } from 'react';
import { SummaryCard } from '../components/SummaryCard'
import { LineChart } from '@mui/x-charts/LineChart';

const Ventas = () => {
  // const companyInventory = () => {

  //   const accessToken = localStorage.getItem("token")

  //   if (!accessToken) {
  //     alert("No hay token de autenticación. Por favor, inicia sesión para añadir productos.");
  //     return
  //   }

  //   fetch(`${backend_url}/company/inventory`, {
  //     method: 'GET',
  //     headers: {
  //       "Authorization": `Bearer ${accessToken}`
  //     }
  //   })
  //     .then(resp => resp.json())
  //     .then((data) => {
  //       console.log("Success!!", data)
  //       if (data && Array.isArray(data.inventory)) {
  //         setProducts(data.inventory)
  //       } else {

  //         throw new Error("Formato de datos de inventario = ERROR.")
  //       }
  //     })
  //     .catch(error => console.log(error))
  // }


  // useEffect(() => {
  //   companyInventory()
  // }, [])

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

  return (
    <div className="row me-0 h-100">
      <div className="col-12 pe-0">
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgba(244, 245, 252, 1)" }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><h4>Ordenes de Venta</h4></a>
            <form className="d-flex" role="search">
              <button className="boton-cliente btn w-100" type="submit">
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
          <tbody>
            <tr>
              <th scope="row">Manuel</th>
              <td>manueld@gmail.com</td>
              <td>595532321</td>
              <td>Ordenes Previas</td>
              <td>500$</td>
              <td>VISTA</td>
            </tr>
            <tr>
              <th scope="row">Massimo</th>
              <td>Massi59@gmail.com</td>
              <td>052145214</td>
              <td>Ordenes Previas</td>
              <td>10.000$</td>
              <td>VISTA</td>
            </tr>
            <tr>
              <th scope="row">Gabriel</th>
              <td>Gabriel78@gmail.com</td>
              <td>5221562</td>
              <td>Ordenes Previas</td>
              <td>9.000$</td>
              <td>VISTA</td>
            </tr>
            <tr>
              <th scope="row">Jorge</th>
              <td>Jorgef98@gmail.com</td>
              <td>6325511</td>
              <td>Ordenes Previas</td>
              <td>858$</td>
              <td>VISTA</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
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
        </div>
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
      </div>


  )
}

export default Ventas