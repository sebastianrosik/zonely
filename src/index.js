import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store';
import { addTimeZone } from './actions/timeZones';

store.dispatch(addTimeZone('Etc/GMT+0'));
store.dispatch(addTimeZone('Europe/Warsaw'));

store.dispatch(addTimeZone('Africa/Abidjan'));
store.dispatch(addTimeZone('Africa/Addis_Ababa'));
store.dispatch(addTimeZone('Africa/Algiers'));
store.dispatch(addTimeZone('Africa/Asmara'));
store.dispatch(addTimeZone('Africa/Asmera'));
// store.dispatch(addTimeZone('Africa/Bamako'));
// store.dispatch(addTimeZone('Africa/Banjul'));
// store.dispatch(addTimeZone('Africa/Blantyre'));
// store.dispatch(addTimeZone('Africa/Brazzaville'));
// store.dispatch(addTimeZone('Africa/Bujumbura'));
// store.dispatch(addTimeZone('Africa/Cairo'));
// store.dispatch(addTimeZone('Africa/Casablanca'));
// store.dispatch(addTimeZone('Africa/Dar_es_Salaam'));
// store.dispatch(addTimeZone('Africa/Conakry'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
