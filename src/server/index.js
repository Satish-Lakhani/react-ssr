import express from 'express';
import request from 'request';

import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';

import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from '../routes';
import * as reducers from '../client/store/reducers';
import Template from './template';

const router = express.Router();

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

router.get('*', (req, res) => {
  try {
    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({ route, match }) => {
      let fetchData = route.component.fetchData;
      return fetchData instanceof Function ? fetchData(store, match) : Promise.resolve(null)
    });

    return Promise.all(promises).then((data) => {
      let context = {};
      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      );

      const helmet = Helmet.renderStatic();

      if (context.status === 404) {
        res.status(404);
      }

      if (context.status === 302) {
        return res.redirect(302, context.url);
      }

      res.status(200).send(Template({
        markup: content,
        helmet: helmet,
      }));
    });
  } catch (ex) {
    console.log(ex);
  };
});

module.exports = router;
