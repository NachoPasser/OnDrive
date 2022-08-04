export const SORT_BY_PROXIMITY = "SORT_BY_PROXIMITY";

export const getSortedProximityTrips = (order) => {
    return ({type: SORT_BY_PROXIMITY, payload: order})
}