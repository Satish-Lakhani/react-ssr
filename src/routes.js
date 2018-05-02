import React from 'react';
import { Redirect } from 'react-router';

import AppRoot from './client/components/AppRoot';
import Login from './client/components/login/Login';

const routes = [
  { component: AppRoot,
    routes: [
      { path: '/', exact: true, component: Login }
    ]
  },
];

export default routes;
