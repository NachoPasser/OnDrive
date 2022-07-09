import axios from 'axios';

export const GET_TRIPS = "GET_TRIPS";


export const getTrips = () => {
    return async function (dispatch) {
        axios.get("http://localhost:3001/api/driver"
        ).then(r => dispatch({ type: GET_TRIPS, payload: r.data })
        ).catch(c => console.log(c))
    }
}