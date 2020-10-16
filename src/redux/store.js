import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import listadoReducer from './listadoDucks';

const rootReducer = combineReducers({
    listado: listadoReducer
    // aqui se añaden todos los reducer que se creen (los Ducks).
})

// config de extencion de redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// config de middleware
export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store;
}