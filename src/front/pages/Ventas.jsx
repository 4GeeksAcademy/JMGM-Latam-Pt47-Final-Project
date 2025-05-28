import React, {useEffect} from 'react';


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

  return (
    <div className="row me-0">
      <div className="col-9 pe-0">
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgba(244, 245, 252, 1)" }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><h5>Ordenes de Venta</h5></a>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
              <button className="boton-cliente btn w-75" type="submit">
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
              <th className="col table-secondary">Ultimos 7 Días</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Manuel</th>
              <td>manueld@gmail.com</td>
              <td>595532321</td>
              <td>Ordenes Previas</td>
            </tr>
            <tr>
              <th scope="row">Massimo</th>
              <td>Massi59@gmail.com</td>
              <td>052145214</td>
              <td>Ordenes Previas</td>
            </tr>
            <tr>
              <th scope="row">Gabriel</th>
              <td>Gabriel78@gmail.com</td>
              <td>5221562</td>
              <td>Ordenes Previas</td>
            </tr>
            <tr>
              <th scope="row">Jorge</th>
              <td>Jorgef98@gmail.com</td>
              <td>6325511</td>
              <td>Ordenes Previas</td>
            </tr>
          </tbody>
        </table>
        <div className=" d-flex justify-content-center">
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
      </div>
      {/* Columna de Actividades Recientes */}
      <div className="col-3" style={{ backgroundColor: "rgba(244, 245, 252, 1)" }}>
        <br />
        <h4>Actividad Reciente</h4>
        <div className="card d-flex p-2 text-start px-3" style={{ border: "none", backgroundColor: "rgba(244, 245, 252, 1)" }}>
          <h6 className=''>Reabastecer <b className='text-primary'>x</b> productos</h6>
          <div className='row'>
            <div className='col-2' style={{ paddingTop: "3px" }}>
              <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                style={{ width: "50px", height: "50px" }} />
            </div>
            <div className="col">
              <div className='py-3 text-start'>
                &nbsp;&nbsp;CLIENTNAME - <b className="Texto-ordenes">5h atras</b>
              </div>
            </div>
          </div>
        </div>
        <div className="card d-flex p-2 text-start px-3" style={{ border: "none", backgroundColor: "rgba(244, 245, 252, 1)" }}>
          <h6 className=''>Ordenó <b className='text-primary'>x</b> productos</h6>
          <div className='row'>
            <div className='col-2' style={{ paddingTop: "3px" }}>
              <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                style={{ width: "50px", height: "50px" }} />
            </div>
            <div className="col">
              <div className='py-3 text-start'>
                &nbsp;&nbsp;CLIENTNAME - <b className="Texto-ordenes">1m atras</b>
              </div>
            </div>
          </div>
        </div>
        <div className="card d-flex p-2 text-start px-3" style={{ border: "none", backgroundColor: "rgba(244, 245, 252, 1)" }}>
          <h6 className=''>Ordenó <b className='text-primary'>x</b> productos</h6>
          <div className='row'>
            <div className='col-2' style={{ paddingTop: "3px" }}>
              <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                style={{ width: "50px", height: "50px" }} />
            </div>
            <div className="col">
              <div className='py-3 text-start'>
                &nbsp;&nbsp;CLIENTNAME - <b className="Texto-ordenes">30m atras</b>
              </div>
            </div>
          </div>
        </div>
        <div className="card d-flex p-2 text-start px-3" style={{ border: "none", backgroundColor: "rgba(244, 245, 252, 1)" }}>
          <h6 className=''>Ordenó <b className='text-primary'>x</b> productos</h6>
          <div className='row'>
            <div className='col-2' style={{ paddingTop: "3px" }}>
              <img className='rounded-circle' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                style={{ width: "50px", height: "50px" }} />
            </div>
            <div className="col">
              <div className='py-3 text-start'>
                &nbsp;&nbsp;CLIENTNAME - <b className="Texto-ordenes">6m atras</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Ventas