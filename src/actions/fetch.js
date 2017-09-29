import { actionTypes } from '../config/constants';

const { FETCHED_DATA } = actionTypes;

const dataReceived = payload => {
    return {
        type: FETCHED_DATA,
        payload,
    };
};

export default function fetchData(url) {
    return dispatch => {
        fetch(url)
            .then(response => {
                // console.log(response);
                return response.json();
            })
            .then(json => {
                // console.warn('Fetched', json);
                dispatch(dataReceived({ json, url }));
            })
            .catch(err => {
                console.warn('Parse failed', err);
            });
    };
}
