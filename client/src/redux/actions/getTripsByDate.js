export const FILTER_TRIPS_BY_DATE= "FILTER_TRIPS_BY_DATE";

export const getTripsByDate = (date) => {
    return ({type: FILTER_TRIPS_BY_DATE, payload: date})
}