import { actionTypes } from '../config/constants';

const AppState = {
    doge: 'Hello from doge state!',
};

function appReducer(state = AppState, action) {
    const cases = {
        default: () => state,
    };

    return (cases[action] || cases.default)();
}

export default appReducer;
