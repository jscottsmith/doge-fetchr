import 'babel-polyfill';
import 'whatwg-fetch';

// copies are index.html to the dist folder
// for the webpack dev server to use.
import './index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'components';
import { Provider } from 'react-redux';
import setupStore from './store/setupStore';

const root = document.getElementById('root');
const store = setupStore();
const app = (
    <Provider store={store}>
        <AppContainer />
    </Provider>
);
ReactDOM.render(app, root);
