import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { root } from "postcss";
import { listPage } from './pages/listPage';

const rootRoute = createRootRoute({});

const listRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: listPage,
  path: '/list',
});

const routeTree = rootRoute.addChildren([listRoute]);
export const router = createRouter({
  routeTree,
});