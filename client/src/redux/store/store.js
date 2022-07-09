import { createStore, applyMiddleware, compose } from 'redux'; //importamos createStore, un middleWare
import rootReducer from '../reducer/reducer.js';//importamos a nuestro reducer
import thunk from 'redux-thunk';//Importamos a thunk

const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

//Punto 1: donde creamos a nuestro store
//y le asignamos rootReducer, nuestro reducer
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
);

export default store; //exportamos el store