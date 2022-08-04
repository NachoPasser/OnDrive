import axios from 'axios';
import {API_URL} from "../../config/enviroment";
export const GET_DRIVERS_BY_RATING = "GET_DRIVERS_BY_RATING";

export const getDriversByRating = () => {
    return async function (dispatch) {
        try{
            const response = await axios.get(`${API_URL}/auth/ratings`)
            dispatch({type: GET_DRIVERS_BY_RATING, payload: response.data})
        } catch(e){
            console.log(e)
        }
    }
}