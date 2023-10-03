import { type } from "@testing-library/user-event/dist/type";
import {
    SHOW_ALERT,
    HIDE_ALERT
} from "../types";

// Mostrar una alerta
export function showAlert(alert){
    return (dispatch) => {
        dispatch(showAlertError(alert))
    }
}

const showAlertError = alert => ({
    type: SHOW_ALERT,
    payload: alert
})

export function hideAlertAction() {
    return (dispatch) => {
        dispatch(hideAlert())
    }
}


const hideAlert = () => ({
    type: HIDE_ALERT
})