import axios from 'axios';
import {API_URL} from "../../config/enviroment";
export const GET_SEARCH_FOR_DESTINATION = 'GET_SEARCH';

export function getSearch(destination) {
    return async function pedido(dispatch) {
        let pedidoAlBack = await axios.get(`${API_URL}/api/static/${destination}`);
        return dispatch({
            type: GET_SEARCH_FOR_DESTINATION,
            payload: pedidoAlBack.data,
        });
    };
}