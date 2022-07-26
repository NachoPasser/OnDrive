import axios from 'axios';
import { API_URL } from '../../config/enviroment';
export const SELECT_CAR = 'SELECT_CAR';

export const getCarsById = (token) => {
    return (dispatch) => {
        axios.get(`${API_URL}/cars`,{headers: { 
            Authorization: `Bearer ${token}`
        }})
            .then(response => {
                dispatch({
                    type: SELECT_CAR,
                    payload: response.data
                });
            })
            .catch(error => {
                console.log(error);
            }
        );
    }
}
