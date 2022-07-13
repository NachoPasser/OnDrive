import axios from 'axios';
export const GET_TRIPS = "GET_TRIPS";

export const getTrips = (destination) => {
    return async function (dispatch) {
        axios.get("https://on-drive.herokuapp.com/api/static"
        ).then(trips => dispatch({ type: GET_TRIPS, payload: trips.data })
        ).catch(c => console.log(c))
    }
}