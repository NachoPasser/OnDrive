export const SORT_TRIPS_BY_RATING = 'SORT_TRIPS_BY_RATING'

export const sortTripsByDestination = (order) => {
    return {type: SORT_TRIPS_BY_RATING, payload: order}
}