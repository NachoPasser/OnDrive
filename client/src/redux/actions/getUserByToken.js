import { API_URL } from "../../config/enviroment";
import axios from "axios";
export const GET_USER_BY_ID = 'GET_USER_BY_ID'

export const getUserByToken = (token) => {
    return function (dispatch) {
        axios.get(`${API_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(user => dispatch({ type: GET_USER_BY_ID, payload: user.data })
        ).catch(c => console.log(c))
    }
}