import { combineReducers } from "redux";
import productosReducer from "./productosReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
    productos: productosReducer,
    alert: alertReducer
})