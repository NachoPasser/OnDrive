import { API_URL } from "../../config/enviroment";
import axios from "axios";

export const GET_DRIVER_BY_ID = 'GET_DRIVER_BY_ID'

// export const getDriverById = (driver_id) => {
//     return function (dispatch) {
//         axios.get(`${API_URL}/auth/driver`, {
//             headers: {
//                 user_id: driver_id
//             }
//         })
//             .then(info => dispatch({ type: GET_DRIVER_BY_ID, payload: info }))
//             .catch(c => console.log(c))
//     }
// }


export const getDriverById = (driver_id) => {
    //console.log(driver_id)
    return function (dispatch) {
        axios.get(`${API_URL}/auth/driver`, {
            headers: {
                user_id: driver_id
            }
        })
            .then(info => dispatch({ type: GET_DRIVER_BY_ID, payload: info.data }))
            .catch(c => console.log(c))
    }
}