import { createNewProductAction } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { showAlert, hideAlertAction} from '../actions/alertActions'

const NewProduct = () => {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState(0)

    const dispatch = useDispatch()
    const loading = useSelector(state => state.productos.loading)
    const error = useSelector(state => state.productos.error)
    const alert = useSelector(state => state.alert.alert)

    const addProduct = product => dispatch(createNewProductAction(product))

    const submitNewProduct = e => {
        e.preventDefault()

        if(nombre.trim() === '' || precio <= 0){
            const answer = {
                msg: "Ambos campos son obligatorios",
                class: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlert(answer))

            return
        }
        dispatch(hideAlertAction())
        addProduct({nombre,precio})
        navigate('/')
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Agregar nuevo producto
                        </h2>
                        {alert ? <p className={alert.class}>{alert.msg}</p> : null}
                        <form onSubmit={submitNewProduct}>
                            <div className='form-group'>
                                <label>Nombre Producto</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Name product'
                                    name='name' 
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}/>
                            </div>
                            <div className='form-group'>
                                <label>Precio Producto</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Price product'
                                    name='price' 
                                    value={precio}
                                    onChange={e => setPrecio(e.target.value)}/>
                            </div>
                            <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>Agregar</button>
                        </form>
                        {loading ? <p>Cargando...</p> : null}
                        {error ? <p className='alert alert-danger mt-4 p2 text-center'>Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProduct
