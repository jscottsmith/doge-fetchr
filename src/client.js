import 'babel-polyfill';
import 'whatwg-fetch';

// copies are index.html to the dist folder
// for the webpack dev server to use.
import './index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { App, Fetch } from 'components';
import { Provider } from 'react-redux';

import setupStore from './store/setupStore';

const root = document.getElementById('root');
const store = setupStore();
const app = (
    <Provider store={store}>
        <Fetch endpoint="/breeds/list">
            {({ data }) =>
                // wait for data before rendering.
                // should show a loader or something here
                data ? <App breeds={data} /> : <span>loading...</span>}
        </Fetch>
    </Provider>
);
ReactDOM.render(app, root);
