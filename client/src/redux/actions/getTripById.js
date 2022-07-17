import axios from 'axios';
import {API_URL} from "../../config/enviroment";
export const GET_TRIP_BY_ID = "GET_TRIP_BY_ID";

export const getTripById = (id) => {
    return async function (dispatch) {
        axios.get(`${API_URL}/api/static/trip/${id}`
        ).then(trip => dispatch({ type: GET_TRIP_BY_ID, payload: trip.data.value.trip })
        ).catch(c => console.log(c))
    }
}