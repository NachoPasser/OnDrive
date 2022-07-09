import { GET_TRIPS } from '../actions/getTrips.js';


const initialState = {
    trips: [],//Todos los Trips [{},{},{},{},]
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIPS:
            return {
                ...state,
                trips: action.payload //trips debe sobreescribirse siempre
            }
        default:
            return state
    }
}

export default rootReducer;