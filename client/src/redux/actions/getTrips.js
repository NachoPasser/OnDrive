import axios from 'axios';
import {API_URL} from "../../config/enviroment";
export const GET_TRIPS = "GET_TRIPS";

export const getTrips = (destination) => {
    return async function (dispatch) {
        axios.get(`${API_URL}/api/static`
        ).then(trips => dispatch({ type: GET_TRIPS, payload: trips.data })
        ).catch(c => console.log(c))
    }
}