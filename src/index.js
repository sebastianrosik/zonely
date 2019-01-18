import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store';
import { addTimeZone } from './actions/timeZones';
import TimeZone from './lib/TimeZone';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

const usersTimeZone = TimeZone.guessUsersTimeZone();

store.dispatch(addTimeZone(usersTimeZone));
store.dispatch(addTimeZone('Etc/GMT+0'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
