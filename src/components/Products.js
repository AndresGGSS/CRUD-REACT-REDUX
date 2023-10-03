import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductsAction } from "../actions/productActions"
import Product from "./Product"

const Products = () => {

  const dispatch = useDispatch()
  const products = useSelector(state => state.productos.productos)
  const error = useSelector(state => state.productos.error)
  const loading = useSelector(state => state.productos.loading)

  useEffect( () => {
    const loadingProducts = () => dispatch(getProductsAction())
    loadingProducts()
    //eslint-disable-next-line
  },[])

  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de productos</h2>
      {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
      {loading ? <p className="text-center">Cargando</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? 'No hay productos' : (
            products.map(product => (
              <Product product={product} key={product.id}/>
            ))
          )}
        </tbody>
      </table>
    </Fragment>
  )
}

export default Products
