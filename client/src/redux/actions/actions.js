import axios from 'axios';

export const GET_TRIPS = "GET_TRIPS";


export const getTrips = () => {
    return async function (dispatch) {
        axios.get("http://localhost:3001/trip"
        ).then(r => dispatch({ type: GET_TRIPS, payload: r })
        ).catch(c => console.log(c))
    }
}