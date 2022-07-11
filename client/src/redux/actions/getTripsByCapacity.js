export const FILTER_TRIPS_BY_CAPACITY= "FILTER_TRIPS_BY_CAPACITY";

export const getTripsByCapacity = (date) => {
    return ({type: FILTER_TRIPS_BY_CAPACITY, payload: date})
}