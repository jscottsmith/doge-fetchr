import 'babel-polyfill';

// copies are index.html to the dist folder
// for the webpack dev server to use.
import './index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components';

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
