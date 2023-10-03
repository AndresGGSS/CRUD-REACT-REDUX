import { useDispatch, useSelector } from "react-redux"
import { editProductAction } from "../actions/productActions"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [producto, setProducto] = useState({
        nombre: '',
        precio: ''
    })
    
    const productEdit = useSelector(state => state.productos.productedit)
    
    useEffect(() => {
        setProducto(productEdit)
    }, [productEdit])

    const onChangeForm = e => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        })
    }
    
    const { nombre, precio } = producto
    
    const handleEdit = e => {
        e.preventDefault()
    
        dispatch(editProductAction(producto))
        navigate('/')
    }
    
  return (
    <div className='row justify-content-center'>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-weight-bold'>
                        Editar producto
                    </h2>
                    <form onSubmit={handleEdit}>
                        <div className='form-group'>
                            <label>Nombre Producto</label>
                            <input 
                            type='text'
                            className='form-control'
                            placeholder='Name product'
                            name='nombre'
                            value={nombre}
                            onChange={onChangeForm}/>
                        </div>
                        <div className='form-group'>
                            <label>Precio Producto</label>
                            <input 
                            type='number'
                            className='form-control'
                            placeholder='Price product'
                            name='precio'
                            value={precio}
                            onChange={onChangeForm}/>
                        </div>
                        <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>Guardar cambios</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditProduct
