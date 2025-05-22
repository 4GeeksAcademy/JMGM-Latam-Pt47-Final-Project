import React from 'react'
import { SummaryCard } from '../components/SummaryCard'
import { BarChart } from '@mui/x-charts/BarChart';

export const Dashboard = () => {
  return (
    <>
      <div className='py-3 px-5' style={{ backgroundColor: "#F4F5FC" }}>
        <h3 className='fw-bold'>Resumen general</h3>
        <div className='d-flex justify-content-around'>
          <SummaryCard />
          <SummaryCard />
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
                  data: ['bar A', 'bar B', 'bar C'],
                  colorMap: {
                    type: 'piecewise',
                    thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
                    colors: ['blueviolet'],
                  },
              }]}
              series={[
                {
                  data: [2, 5, 3],
                },
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
          <div>
            <p><i class="bi bi-bell-fill" style={{ color: "#FF9500" }} /> NOTIFICACION</p>
          </div>
        </div>
      </div>
      <div className='sales-summary p-3'>
        <div className='d-flex justify-content-between'>
          <h4 className='fw-bold'>Reporte de inventario</h4>
          <div class="btn-group">
            <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Right-aligned menu
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <button class="dropdown-item" type="button">Action</button>
              <button class="dropdown-item" type="button">Another action</button>
              <button class="dropdown-item" type="button">Something else here</button>
            </div>
          </div>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>John</td>
                <td>Doe</td>
                <td>@social</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
