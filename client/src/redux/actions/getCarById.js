import axios from 'axios';
import {API_URL} from "../../config/enviroment";
export const GET_CAR_BY_ID = "GET_CAR_BY_ID";

export const getCarById = (car_id) => {
    return async function (dispatch) {
        try{
            const response = await axios.get(`${API_URL}/cars/${car_id}`)
            dispatch({type: GET_CAR_BY_ID, payload: response.data})
        } catch(e){
            console.log(e)
        }
    }
}