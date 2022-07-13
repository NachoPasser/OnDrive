import axios from 'axios';
export const GET_SEARCH_FOR_DESTINATION = 'GET_SEARCH';

export function getSearch(destination) {
    return async function pedido(dispatch) {
        let pedidoAlBack = await axios.get(`https://on-drive.herokuapp.com/api/static/${destination}`);
        return dispatch({
            type: GET_SEARCH_FOR_DESTINATION,
            payload: pedidoAlBack.data,
        });
    };
}