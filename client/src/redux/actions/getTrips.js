import axios from 'axios';
import {API_URL} from "../../config/enviroment";
export const GET_TRIPS = "GET_TRIPS";
export const GET_TRIP_BY_ID = "GET_TRIP_BY_ID";

export const getTrips = (destination) => {
    return function (dispatch) {
        axios.get("http://localhost:3001/api/static"
        ).then(trips => dispatch({ type: GET_TRIPS, payload: trips.data })
        ).catch(c => console.log(c))
    }
}
export function getTripById(id){
    return async (dispatch) => {
        let p = await axios.get('http://localhost:3001/api/static');
        let t = p.data.find(a=>a.id===id);
        return dispatch({
        type:"GET_TRIP_BY_ID",
        payload: t
        })
    }
}
