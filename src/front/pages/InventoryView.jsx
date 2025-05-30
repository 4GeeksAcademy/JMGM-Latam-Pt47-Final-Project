import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const backend_url = import.meta.env.VITE_BACKEND_URL;

export const InventoryView = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalIsOpen = JSON.parse(queryParams.get('modalIsOpen')) || false
  
  const [products, setProducts] = useState([])
  const [productModal, setProductModal] = useState(modalIsOpen)
  const [newProductData, setNewProductData] = useState({
    product_name: '',
    marca: '',
    price: '',
    stock: ''
  })
  

  const companyInventory = () => {

    const accessToken = localStorage.getItem("token")

    if (!accessToken) {
      alert("No hay token de autenticación. Por favor, inicia sesión para añadir productos.")
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

          throw new Error("Formato de datos de inventario = ERROR.")
        }
      })
      .catch(error => console.log(error))
  }


  useEffect(() => {
    companyInventory()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProductData(data => ({
      ...data,
      [name]: value
    }))
  }

  const createProductModal = (e) => {
    e.preventDefault()

    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      alert("No hay token de autenticación. Por favor, inicia sesión para añadir productos.")
      return
    }

    fetch(`${backend_url}/inventory`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(newProductData)
    })
      .then(resp => resp.json())
      .then((data)=> {
        console.log(data)
        setProducts([...products, data.item])
        setProductModal(false)
        
      })
      .catch(error => console.log(error))

  }

  // -------------------------------------------------------------------------

  return (
    <div className="row me-0">
      <div className="col-12 pe-0">
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "rgba(244, 245, 252, 1)" }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="#"><h4>Inventario</h4></a>
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <button
                className="boton-cliente btn w-100"
                type="button"
                onClick={() => setProductModal(true)}
              >
                <i className="fa-solid fa-circle-plus"></i>&nbsp;Nuevo producto
              </button>
            </form>
          </div>
        </nav>
        {/* Código de la Tabla */}
        <table className="table">
          <thead>
            <tr>
              <th className="col table-secondary">Nombre</th>
              <th className="col table-secondary">Codigo</th>
              <th className="col table-secondary">Tipo</th>
              <th className="col table-secondary">Precio</th>
              <th className="col table-secondary">Cantidad</th>
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
                  <td>{product.stock || 'N/A'}</td>
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

      {/* <div className='d-flex justify-content-center' style={{ paddingTop: '40%' }}>
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
      </div> */}

      {/* --- Modal para Nuevo Producto --- */}
      {productModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Añadir Nuevo Producto</h5>
                <button type="button" className="btn-close" onClick={() => setProductModal(false)} ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={createProductModal}>
                  <div className="mb-3">
                    <label htmlFor="product_name" className="form-label">Nombre del Producto</label>
                    <input
                      type="text"
                      className="form-control"
                      id="product_name"
                      name="product_name"
                      value={newProductData.product_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca/Tipo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="marca"
                      name="marca"
                      value={newProductData.marca}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      id="price"
                      name="price"
                      value={newProductData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Cantidad (Stock)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock"
                      name="stock"
                      value={newProductData.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setProductModal(false)}>Cerrar</button>
                    <button type="submit" className="boton-cliente btn ">Guardar Producto</button>
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