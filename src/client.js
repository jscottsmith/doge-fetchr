import 'babel-polyfill';

// copies are index.html to the dist folder
// for the webpack dev server to use.
import './index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components';
import { Provider } from 'react-redux';

import setupStore from './store/setupStore';

const root = document.getElementById('root');
const store = setupStore();
const app = (
    <Provider store={store}>
        <App />
    </Provider>
);
ReactDOM.render(app, root);
