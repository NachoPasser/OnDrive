import { GET_TRIPS } from '../actions/actions.js';


state = {
    trips: []
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIPS: {
            return {
                ...state,
                trips: action.payload //trips debe sobreescribirse siempre
            }
        }
    }
}

export default rootReducer;