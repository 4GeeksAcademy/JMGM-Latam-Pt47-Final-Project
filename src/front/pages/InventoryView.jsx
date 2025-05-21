import React from 'react'

export const InventoryView = () => {
  return (
    <div className="row m-0">
      <div className="col-9">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><h5>Inventario</h5></a>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
              <button className="boton-cliente btn w-100" type="submit">
                <i className="fa-solid fa-circle-plus"></i>&nbsp;Nuevo producto</button>
            </form>
          </div>
        </nav>
        {/* Codigo de la Tabla */}
        <table className="table">
          <thead>
            <tr>
              <th className="col table-secondary">Nombre</th>
              <th className="col table-secondary">Codigo</th>
              <th className="col table-secondary">Tipo</th>
              <th className="col table-secondary">Precio</th>
              <th className="col table-secondary">Cantidad</th>
              <th className="col table-secondary">Imagen</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <td>Mackbook</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>50</td>
              <td>imagen</td>
            </tr>
            <tr>
              <td>Lenovo</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>55</td>
              <td>imagen</td>
            </tr>
            <tr>
              <td>Dell</td>
              <td>John</td>
              <td>Doe</td>
              <td>@social</td>
              <td>90</td>
              <td>imagen</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-3">
        <h4>Actividad reciente</h4>
        <div className="card d-flex p-2 text-start px-3" style={{ border: "none" }}>
          <h6 className=''>Reabastecer <b className='text-primary'>x</b> productos</h6>
          <div className='row '>
            <div className='col' style={{ paddingTop: "3px" }}>
              <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                style={{ width: "50px", height: "50px" }} />
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-center' style={{paddingTop: '40%'}}>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  )
}