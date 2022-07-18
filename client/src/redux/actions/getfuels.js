import axios from 'axios';
import { API_URL } from '../../config/enviroment';


export const GET_FUELTABLE = "GET_FUELTABLE";

export const getFuelTable = (boolean) => {
    let refresh = ""
    if (boolean) refresh = `refresh=${boolean}`
    return async function (dispatch) {
        axios.get(`${API_URL}/fuels/table?${refresh}`
        ).then(r =>
            dispatch({
                type: GET_FUELTABLE,
                payload: r.data
            })
        ).catch(e => console.log(e))
    }
};
