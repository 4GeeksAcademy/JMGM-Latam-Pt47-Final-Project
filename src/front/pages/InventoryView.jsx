import React from 'react';
import { useState, useEffect } from 'react';
const backend_url = import.meta.env.VITE_BACKEND_URL;

export const InventoryView = () => {
  const [products, setProducts] = useState([])
  const [showNewProductModal, setShowNewProductModal] = useState(false)

  const companyInventory = () => {

    let accessToken = localStorage.getItem("token")
    if (!accessToken) {
      setError("No se encontró el token de autenticación. Por favor, inicia sesión.")
      setLoading(false)
      return
    }

    fetch(`${backend_url}/company/inventory`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
      .then(resp => resp.json())
      .then((data) => {
        console.log("Success!!", data)
        if (data && Array.isArray(data.inventory)) {
          setProducts(data.inventory)
        } else {

          throw new Error("Formato de datos de inventario inesperado del servidor.")
        }
      })
      .catch(error => console.log(error))
  }


  useEffect(() => {
    companyInventory()
  }, [])

  const handleNewProductClick = () => {
    setShowNewProductModal(true);
    // Aquí puedes abrir un modal o redirigir a un formulario para añadir un nuevo producto
    console.log("Abrir formulario/modal de nuevo producto");
  };
  return (
    <div className="row m-0">
      <div className="col-9">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><h5>Inventario</h5></a>
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
              <button className="boton-cliente btn w-100" 
              type="button"
              onClick={handleNewProductClick}>
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
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.product_name}</td>
                  <td>{product.id || 'N/A'}</td>
                  <td>{product.marca || 'N/A'}</td>
                  <td>${product.price ? product.price.toFixed(2) : 'N/A'}</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    ) : (
                      'Sin Imagen'
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No hay productos en el inventario.</td>
              </tr>
            )}
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
      <div className='d-flex justify-content-center' style={{ paddingTop: '40%' }}>
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