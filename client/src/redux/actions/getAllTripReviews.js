import axios from 'axios';
import {API_URL} from "../../config/enviroment";
export const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";

export const getAllTripsReviews = (user_id) => {
    return async function (dispatch) {
        try{
            const response = await axios.get(`${API_URL}/trip/review/getAll`, {headers: {
                user_id
            }})
            dispatch({type: GET_ALL_REVIEWS, payload: response.data})
        } catch(e){
            console.log(e)
        }
        // console.log(data)
    }
}