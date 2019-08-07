import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import { connectToInfura } from './services/ether';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/styles/style.scss';

export const ReduxState = store;
export const provider = connectToInfura();

ReactDOM.render(
  <Provider store={ReduxState}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
