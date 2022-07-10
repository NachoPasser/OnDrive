export const FILTER_TRIPS_BY_ORIGIN = "FILTER_TRIPS_BY_ORIGIN";

export const getTripsByOrigin = (origin) => {
    return ({type: FILTER_TRIPS_BY_ORIGIN, payload: origin})
}