import { GET_TRIPS } from '../actions/getTrips.js';
import { SORT_TRIPS_BY_RATING } from '../actions/sortTripsByRating.js';
import { SORT_TRIPS_ALPHABETICALLY } from '../actions/sortTripsAlphabetically.js';
import { GET_SEARCH_FOR_DESTINATION } from '../actions/getSearch.js';
import { GET_USERS_FROM_DB } from '../actions/getUsersFromDatabase.js';
import { GET_TRIP_BY_ID } from '../actions/getTripById.js'
import { GET_FUELTABLE } from '../actions/getfuels.js';
import { FILTER_TRIPS } from '../actions/getFilteredTrips.js';
import { GET_USER_BY_ID } from '../actions/getUserById.js';
import { GET_ALL_REVIEWS } from '../actions/getAllTripReviews.js';
import { GET_DRIVER_BY_ID } from '../actions/getDriverById.js';

const initialState = {
    trips: [], // trips variables
    filters: { origin: 'Origen', destination: 'Destino', capacity: 'Capacidad', date: 'Fecha' },
    fixedTrips: [], //trips fijos
    users: [],
    tripById: {},
    prices: [], //of fuels
    userById: {},
    reviews: null,
    driverById: {}
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

        case GET_USER_BY_ID:
            return {
                ...state,
                userById: action.payload
            }

        case GET_ALL_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            }

        case FILTER_TRIPS:
            let filteredTrips = state.fixedTrips
            let { origin, destination, capacity, date } = action.payload
            if (origin !== 'Origen') { //origin es false o es un string
                filteredTrips = filteredTrips.filter(t => t.origin.includes(origin))
            }

            if (destination !== 'Destino') { //destination es false o es un string
                filteredTrips = filteredTrips.filter(t => t.destination.includes(destination))
            }

            if (capacity !== 'Capacidad') { //capacidad es false o es un numero
                filteredTrips = filteredTrips.filter(t => t.capacity === Number(capacity))
            }

            if (date !== 'Fecha') {  //date es false o es un objeto Date
                filteredTrips = filteredTrips.filter((trip) => new Date(trip.start_date).toDateString() === date.toDateString())
            }

            return {
                ...state,
                trips: filteredTrips,
                filters: action.payload
            }

        case GET_SEARCH_FOR_DESTINATION:
            return {
                ...state,
                trips: action.payload
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

        case GET_DRIVER_BY_ID:
            return {
                ...state,
                driverById: action.payload
            };
        default:
            return state
    }
}

export default rootReducer;