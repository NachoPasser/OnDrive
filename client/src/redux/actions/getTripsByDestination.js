export const FILTER_TRIPS_BY_DESTINATION = "FILTER_TRIPS_BY_DESTINATION";

export const getTripsByDestination = (destination) => {
    return ({type: FILTER_TRIPS_BY_DESTINATION, payload: destination})
}