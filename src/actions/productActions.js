import {
    ADD_PRODUCT,
    ADD_PRODUCT_ERROR,
    ADD_PRODUCT_SUCCESS,
    START_DOWNLOAD_PRODUCTS,
    START_PRODUCTS_SUCCESS,
    START_PRODUCTS_ERROR,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_ERROR,
    GET_PRODUCT_DELETE,
    GET_PRODUCT_EDIT,
    PRODUCT_EDIT_ERROR,
    PRODUCT_EDIT_SUCCESS,
    START_EDIT_PRODUCT
} from "../types";
import clientAxios from "../config/axios";
import Swal from "sweetalert2";

export function createNewProductAction(product) {
    return async (dispatch) => {
        dispatch(addProduct())
        try {
            await clientAxios.post('/productos', product)
            dispatch(addProductSuccess(product))
            Swal.fire('Correcto', 'El producto se agregó correctamente', 'success')
        } catch (error) {
            console.log(error.toJSON())
            dispatch(addProductError(true))
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intente de nuevo'
            })
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT
})

const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
})

const addProductError = state => ({
    type: ADD_PRODUCT_ERROR,
    payload: state
})

export function getProductsAction() {
    return async (dispatch) => {
        dispatch(downloadProducts())
        try {
            const answer = await clientAxios.get('/productos')
            dispatch(downloadProductsSuccess(answer.data))
        } catch (error) {
            console.log(error)
            dispatch(downloadProductsError())
        }
    }
}

const downloadProducts = () => ({
    type: START_DOWNLOAD_PRODUCTS,
    payload: true
})

const downloadProductsSuccess = products => ({
    type: START_PRODUCTS_SUCCESS,
    payload: products
})

const downloadProductsError = () => ({
    type: START_PRODUCTS_ERROR,
    payload: true
})

export function deleteProductAction(id) {
    return async (dispatch) => {
        dispatch(getProductDeleted())
        try {
            await clientAxios.delete(`/productos/${id}`)
            dispatch(deleteProductSuccessful())
            Swal.fire(
                'Eliminado',
                'Se elimino correctamente el producto',
                'success'
              )
        } catch (error) {
            console.log(error)
            dispatch(deleteProductError())
        }
    }
}

const getProductDeleted = id => ({
    type: GET_PRODUCT_DELETE,
    payload: id
})

const deleteProductSuccessful = () => ({
    type: PRODUCT_DELETE_SUCCESS
})

const deleteProductError = () => ({
    type: PRODUCT_DELETE_ERROR,
    payload: true
})

export function getProductEdit(product) {
    return (dispatch) => {
        dispatch(getProductEditAction(product));
    };
}

const getProductEditAction = (product) => ({
    type: GET_PRODUCT_EDIT,
    payload: product,
});

export function editProductAction(product) {
    return async (dispatch) => {
        dispatch(editProduct());
        try {
            await clientAxios.put(`/productos/${product.id}`, product);
            dispatch(editProductSuccesful(product))
        } catch (error) {
            dispatch(editProductError())
        }
    };
}

const editProduct = (product) => ({
    type: START_EDIT_PRODUCT,
});

const editProductSuccesful = product => ({
    type:PRODUCT_EDIT_SUCCESS,
    payload:product
})

const editProductError = () => ({
    type: PRODUCT_EDIT_ERROR,
    payload: true
})
