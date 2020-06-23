import Home from './client/pages/Home/Home';
import { loadData } from './server/index';
import { ReactComponentElement, ReactElement } from 'react';
import { ServerRoute } from './server/typings';
// import NotFound from './NotFound';

const ServerRoutes: ServerRoute[] = [
  {
    path: '/',
    exact: true,
    component: Home,
    loadData: () => loadData()
  },
];

export default ServerRoutes;