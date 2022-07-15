import axios from 'axios';
import {API_URL} from "../../config/enviroment";
export const GET_USERS_FROM_DB = 'GET_USERS_FROM_DB'

export function getUsersFromDatabase() {
    return async function pedido(dispatch) {
        let pedidoAlBack = await axios.get(`${API_URL}/auth/users`);
        return dispatch({
            type: GET_USERS_FROM_DB,
            payload: pedidoAlBack.data,
        });
    };
}