import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { listPage } from './pages/listPage';
import { adPage } from './pages/adPage';

const rootRoute = createRootRoute({});

const listRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: listPage,
  path: '/list',
});

const adRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: adPage,
  path: '/item/$id',
});

const routeTree = rootRoute.addChildren([listRoute, adRoute]);
export const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}