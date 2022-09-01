import { GET_TRIPS } from '../actions/getTrips.js';
import { GET_SEARCH_FOR_DESTINATION } from '../actions/getSearch.js';
import { GET_USERS_FROM_DB } from '../actions/getUsersFromDatabase.js';
import { GET_TRIP_BY_ID } from '../actions/getTripById.js'
import { GET_FUELTABLE } from '../actions/getfuels.js';
import { FILTER_TRIPS } from '../actions/getFilteredTrips.js';
import { SORT_BY_RATING } from '../actions/getSortedRatingTrips.js';
import { SORT_BY_PROXIMITY } from '../actions/getSortedProximityTrips.js';
import { GET_USER_BY_ID } from '../actions/getUserById.js';
import { GET_ALL_REVIEWS } from '../actions/getAllTripReviews.js';
import { GET_DRIVER_BY_ID } from '../actions/getDriverById.js';
import { GET_CAR_BY_ID } from '../actions/getCarById.js';
import { GET_DRIVERS_BY_RATING } from '../actions/getDriversByRating.js';

const initialState = {
    trips: [], // trips variables
    filters: { origin: 'Origen', destination: 'Destino', capacity: 'Capacidad', date: 'Fecha' },
    fixedTrips: [], //trips fijos
    notSortedTrips: [],
    reviews: null,
    users: [],
    prices: [], //of fuels
    tripById: {},
    userById: {},
    driverById: {},
    carById:{},
    ratings: []
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
        
        case GET_CAR_BY_ID:
            return {
                ...state,
                carById: action.payload
            }

        case GET_ALL_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            }
            
        case GET_DRIVERS_BY_RATING:
            return {
                ...state,
                ratings: action.payload
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
            
        case GET_SEARCH_FOR_DESTINATION:
            return {
                ...state,
                trips: action.payload
            }
            
        case FILTER_TRIPS:
            let filteredTrips = state.fixedTrips
            let { origin, destination, capacity, date } = action.payload
            console.log(action.payload)
            if (origin !== 'Origen' && destination !== 'Destino') { //origin && destination es false o es un string
                let aux;
                aux = filteredTrips.filter(t => t.origin.toLowerCase().includes(origin.toLowerCase()))
                filteredTrips = aux.filter(t => t.destination.toLowerCase().includes(destination.toLowerCase()))
            }

            // if (destination !== 'Destino') { //destination es false o es un string
            //     filteredTrips = filteredTrips.filter(t => t.destination.includes(destination))
            // }

            if (capacity !== 'Capacidad') { //capacidad es false o es un numero
                if(capacity === '8+'){
                    filteredTrips = filteredTrips.filter(t => t.capacity > 8)
                } else{
                    filteredTrips = filteredTrips.filter(t => capacity.includes(t.capacity))
                }
            }

            if (date !== 'Fecha') {  //date es false o es un objeto Date
                filteredTrips = filteredTrips.filter((trip) => new Date(trip.start_date).toDateString() === date.toDateString())
            }

            return {
                ...state,
                trips: filteredTrips,
                filters: action.payload
            }

        case SORT_BY_PROXIMITY:
            let sortedTripsProximity = action.payload === 'ASC'
                ? state.trips.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
                : state.trips.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
            return {
                ...state,
                trips: [...sortedTripsProximity],
            }

        case SORT_BY_RATING:
            let sortedTripsRating = state.trips.sort((a, b) => b.rating - a.rating)
            return {
                ...state,
                trips: [...sortedTripsRating],
            }

        default:
            return state
    }
}

export default rootReducer;