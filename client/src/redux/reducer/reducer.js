import { GET_TRIPS } from '../actions/getTrips.js';
import { FILTER_TRIPS_BY_DESTINATION } from '../actions/getTripsByDestination.js';
import { SORT_TRIPS_BY_RATING } from '../actions/sortTripsByRating.js';
import { SORT_TRIPS_ALPHABETICALLY } from '../actions/sortTripsAlphabetically.js';
import { FILTER_TRIPS_BY_ORIGIN } from '../actions/getTripsByOrigin.js';

const initialState = {
    trips: [], // trips variables
    fixedTrips: [], //trips fijos,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIPS: 
            return {
                ...state,
                trips: action.payload,
                fixedTrips: action.payload,
            }
        
        case FILTER_TRIPS_BY_ORIGIN: 
            if(action.payload === 'Origen'){
                return {
                    ...state,
                    trips: state.fixedTrips
                }
            }
            let filteredOrgTrips = state.fixedTrips.filter(t => t.origin.includes(action.payload))
            return {
                ...state,
                trips: filteredOrgTrips
            }

        case FILTER_TRIPS_BY_DESTINATION: 
            if(action.payload === 'Destino'){
                return state
            }
            let filteredDestTrips = state.trips.filter(t => t.destination.includes(action.payload))
            return {
                ...state,
                trips: filteredDestTrips
            }

        case SORT_TRIPS_BY_RATING: 
            let sortedByRating = action.payload === 'ASC'
            ? state.trips.sort((a, b) => a.rating - b.rating)
            : state.trips.sort((a, b) => b.rating - a.rating)
            return {
                ...state,
                trips: [...sortedByRating]
            }
        
        case SORT_TRIPS_ALPHABETICALLY :
            let sortedAlphabetically = action.payload === 'ASC' 
            ? state.trips.sort((a,b) => a.destination.localeCompare(b.destination))
            : state.trips.sort((a,b) => b.destination.localeCompare(a.destination))
            return {
                ...state,
                trips: [...sortedAlphabetically]
            }

        default:
            return state
    }
}

export default rootReducer;