import { combineReducers } from 'redux';

import app from './app.js';
import requests from './requests.js';

export default combineReducers({ app, requests });
