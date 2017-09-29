import { actionTypes } from '../config/constants';

const { FETCHED_DATA } = actionTypes;

const requestsState = {};

function requestsReducer(state = requestsState, action) {
    const { type, payload } = action;
    const cases = {
        [FETCHED_DATA]: () => {
            const { json, url } = payload;

            // save the request url and message so that
            // it can be retrieved later if the same
            // request is made
            const nextState = Object.assign({}, state, {
                [url]: json.message,
            });

            return nextState;
        },
        default: () => state,
    };

    return (cases[type] || cases.default)();
}

export default requestsReducer;
