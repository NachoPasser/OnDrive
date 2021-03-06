import { GET_TRIPS } from '../actions/getTrips.js';
import { FILTER_TRIPS_BY_DESTINATION } from '../actions/getTripsByDestination.js';
import { SORT_TRIPS_BY_RATING } from '../actions/sortTripsByRating.js';
import { SORT_TRIPS_ALPHABETICALLY } from '../actions/sortTripsAlphabetically.js';
import { FILTER_TRIPS_BY_ORIGIN } from '../actions/getTripsByOrigin.js';
import { FILTER_TRIPS_BY_DATE } from '../actions/getTripsByDate.js';
import { FILTER_TRIPS_BY_CAPACITY } from '../actions/getTripsByCapacity.js';
import { GET_SEARCH_FOR_DESTINATION } from '../actions/getSearch.js';
import { GET_USERS_FROM_DB } from '../actions/getUsersFromDatabase.js';
import { GET_TRIP_BY_ID } from '../actions/getTripById.js'
import { GET_FUELTABLE } from '../actions/getfuels.js';

const initialState = {
    trips: [], // trips variables
    fixedTrips: [], //trips fijos
    users: [],
    tripById: {},

    prices: [], //of fuels
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIPS:
            return {
                ...state,
                trips: action.payload,
                fixedTrips: action.payload,
            }

        case GET_USERS_FROM_DB:
            return {
                ...state,
                users: action.payload
            }

        case FILTER_TRIPS_BY_ORIGIN:
            if (action.payload === 'Origen') {
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
            if (action.payload === 'Destino') {
                return state
            }
            let filteredDestTrips = state.trips.filter(t => t.destination.includes(action.payload))
            return {
                ...state,
                trips: filteredDestTrips
            }

        case GET_SEARCH_FOR_DESTINATION:
            return {
                ...state,
                trips: action.payload
            }

        case FILTER_TRIPS_BY_DATE:
            let found = state.fixedTrips.filter((trip) => new Date(trip.start_date).toDateString() === action.payload.toDateString())
            return {
                ...state,
                trips: found
            }

        case FILTER_TRIPS_BY_CAPACITY:
            let filteredCapTrips = state.fixedTrips.filter(t => t.capacity === Number(action.payload))
            return {
                ...state,
                trips: filteredCapTrips
            }
        case SORT_TRIPS_BY_RATING:
            let sortedByRating = action.payload === 'ASC'
                ? state.trips.sort((a, b) => a.rating - b.rating)
                : state.trips.sort((a, b) => b.rating - a.rating)
            return {
                ...state,
                trips: [...sortedByRating]
            }

        case SORT_TRIPS_ALPHABETICALLY:
            let sortedAlphabetically = action.payload === 'ASC'
                ? state.trips.sort((a, b) => a.destination.localeCompare(b.destination))
                : state.trips.sort((a, b) => b.destination.localeCompare(a.destination))
            return {
                ...state,
                trips: [...sortedAlphabetically]
            }

        case GET_TRIP_BY_ID:
            return {
                ...state,
                tripById: action.payload,
            }

        case GET_FUELTABLE:
            return {
                ...state,
                prices: [action.payload] //Va encerrado con corchetes
            };

        default:
            return state
    }
}

export default rootReducer;