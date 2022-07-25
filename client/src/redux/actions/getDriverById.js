import { API_URL } from "../../config/enviroment";
import axios from 'axios';

export const GET_DRIVER = "GET_DRIVER";

export const getDriverById = (token) => {
    return function (dispatch) {
        axios.post(`${API_URL}/auth/getdriver`, {
            token
        }).then(r => dispatch({ type: GET_DRIVER, payload: r.data })
        ).catch((e) => console.log(e))
    }
}