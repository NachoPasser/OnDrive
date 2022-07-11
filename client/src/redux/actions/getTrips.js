import axios from 'axios';
export const GET_TRIPS = "GET_TRIPS";
export const GET_TRIP_BY_ID = "GET_TRIP_BY_ID";

export const getTrips = (destination) => {
    return async function (dispatch) {
        axios.get("http://localhost:3001/api/static"
        ).then(trips => dispatch({ type: GET_TRIPS, payload: trips.data })
        ).catch(c => console.log(c))
    }
}
export const getTripById = (id) => {
    try{
        return async (dispatch)=>{
            let p = await axios.get('http://localhost:3001/api/driver');
            let tripById=p.data.find((a)=>a.id===id)
            return dispatch({
                type:"GET_TRIP_BY_ID",
                payload: tripById
            })
        }
    }
    catch(err){
        console.log(err)
    }
}