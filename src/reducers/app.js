const AppState = {
    doge: 'Hello from doge state!',
};

function appReducer(state = AppState, { type }) {
    const cases = {
        default: () => state,
    };

    return (cases[type] || cases.default)();
}

export default appReducer;
