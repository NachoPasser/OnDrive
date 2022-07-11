import axios from 'axios';
export const GET_TRIPS = "GET_TRIPS";

export const getTrips = (destination) => {
    return async function (dispatch) {
        axios.get("http://localhost:3001/api/static"
        ).then(trips => dispatch({ type: GET_TRIPS, payload: trips.data })
        ).catch(c => console.log(c))
    }
}