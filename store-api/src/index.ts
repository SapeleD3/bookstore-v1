import { apiRoutes } from './routes';
import AppServer from './commons/server';

const Server = new AppServer({
  routes: {
    api: apiRoutes,
  },
});

// start server
Server.serve();
