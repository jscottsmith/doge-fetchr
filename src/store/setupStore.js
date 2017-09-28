import { createStore } from 'redux';
import rootReducer from '../reducers';

const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

export default function setupStore(initialState) {
    return createStore(rootReducer, initialState, devTools);
}
