import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    START_DOWNLOAD_PRODUCTS,
    START_PRODUCTS_SUCCESS,
    START_PRODUCTS_ERROR,
    GET_PRODUCT_DELETE,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_ERROR,
    GET_PRODUCT_EDIT,
    PRODUCT_EDIT_ERROR,
    PRODUCT_EDIT_SUCCESS,
} from "../types"


const initialState = {
    productos: [],
    error: null,
    loading: false,
    productdelete: null,
    productedit: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case START_DOWNLOAD_PRODUCTS:
        case ADD_PRODUCT: return {
            ...state,
            loading: true
        }
        case ADD_PRODUCT_SUCCESS: return {
            ...state,
            loading: false,
            product: [...state.productos, action.payload]
        }
        case PRODUCT_EDIT_ERROR:
        case PRODUCT_DELETE_ERROR:
        case START_PRODUCTS_ERROR:
        case ADD_PRODUCT_ERROR: return {
            ...state,
            loading: false,
            error: action.payload
        }
        case START_PRODUCTS_SUCCESS: return {
            ...state,
            loading: false,
            error: null,
            productos: action.payload
        }
        case GET_PRODUCT_DELETE: return {
            ...state,
            productdelete: action.payload
        }
        case PRODUCT_DELETE_SUCCESS: return {
              ...state,
              productos: state.productos.filter(product => product.id !== action.payload),
              productdelete: null
            }
        case GET_PRODUCT_EDIT: return {
            ...state,
            productedit: action.payload
        }
        case PRODUCT_EDIT_SUCCESS: return {
            ...state,
            productedit: null,
            productos: state.productos.map(
                producto => producto.id === action.payload.id ? producto = action.payload : producto
            )
        }  
        default: return state

    }
}