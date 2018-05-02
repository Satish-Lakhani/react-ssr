import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from './routes';
import './index.css';

let reducers = combineReducers({
  form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
