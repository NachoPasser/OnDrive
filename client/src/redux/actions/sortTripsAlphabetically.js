export const SORT_TRIPS_ALPHABETICALLY = 'SORT_TRIPS_ALPHABETICALLY'

export const sortTripsAlphabetically = (order) => {
    return {type: SORT_TRIPS_ALPHABETICALLY, payload: order}
}