import appState from '../config/appState.js';

function appReducer(state = appState, { type }) {
    const cases = {
        default: () => state,
    };

    return (cases[type] || cases.default)();
}

export default appReducer;
