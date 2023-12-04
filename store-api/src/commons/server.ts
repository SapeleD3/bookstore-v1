import express, {
  ErrorRequestHandler,
  Express,
  NextFunction,
  Response,
  Request,
} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { IServer } from './interface';
import { ServerProperties } from './types';
import { APP_USE_LIMIT, defaultCatchBlock } from './constants';
import statusCodes from 'http-status-codes';

const { BAD_REQUEST } = statusCodes;

class Server implements IServer {
  PORT: number;
  App: Express;

  constructor({ port = 8080, routes }: ServerProperties) {
    this.PORT = port;

    // Initiate Express App;
    this.App = express();

    // Server Middlewares
    this.App.use(cors());
    this.App.use(helmet());
    this.App.use(express.json());
    this.App.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.App.use(APP_USE_LIMIT);
    this.App.use(
      (
        err: ErrorRequestHandler,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        return defaultCatchBlock(res);
      }
    );

    if (routes.api) {
      this.App.use('/api', routes.api);
    }

    if (routes.webhook) {
      this.App.use('/webhook', routes.webhook);
    }
  }

  serve() {
    this.App.listen(this.PORT, () => {
      console.log(`App is running on http://localhost:${this.PORT}`);
    });
  }
}

export default Server;
