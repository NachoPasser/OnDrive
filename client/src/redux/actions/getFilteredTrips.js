export const FILTER_TRIPS = "FILTER_TRIPS";

export const getFilteredTrips = (filters) => {
    return ({type: FILTER_TRIPS, payload: filters})
}