import React from 'react'
import { SummaryCard } from '../components/SummaryCard'

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
      <div className='d-flex'>
        <div className='graph'>
          <div className='d-flex'>
            <h4 className='fw-bold'>Reporte de inventario</h4>
            <p> <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg">
              <circle r="45" cx="50" cy="50" fill="deepskyblue" />
            </svg> Entradas <svg height="50" width="50" xmlns="http://www.w3.org/2000/svg">
                <circle r="45" cx="50" cy="50" fill="blueviolet" />
              </svg> Salidas </p>
          </div>
          <div className='the-graph-itself'>
            {/* No se que habra que hacer aqui para la grafica pero XD */}
          </div>
        </div>
        <div className='border-start' />
        <div className='notif col-4'>
          <div>
            <h4 className='fw-bold'>Notificaciones</h4>
          </div>
          <div>
            <p><i class="bi bi-bell-fill" style={{ color: "#FF9500" }} /> NOTIFICACION</p>
          </div>
        </div>
      </div>
      <div className='sales-summary'>
        <div>
          <h4 className='fw-bold'>Reporte de inventario</h4>
          <div class="btn-group">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
