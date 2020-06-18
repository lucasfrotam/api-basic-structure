import * as express from 'express';
import { APP_CONFIG } from '../config/app.config';
import { HttpResponseError } from '../api/common/base/error';
// TO-DO swagger integration
// import * as swaggerUi from 'swagger-ui-express';
// import * as yamljs from 'yamljs';
import { MongoController, MongoService } from '../api/common/mongo';
import { DataController, DataService, DataRepository } from '../api/modules/data';

export class Server {
  private server: express.Application;
  private mongoController: MongoController;

  private dataRepository: DataRepository;
  private dataService: DataService;
  private dataController: DataController;

  async init(): Promise<void> {
    this.mongoController = new MongoService(APP_CONFIG.mongoDb.uri);
    await this.mongoController.connectToMongo();

    this.dataRepository = new DataRepository(this.mongoController);
    await this.dataRepository.init();

    this.dataService = new DataService(this.dataRepository);
    this.dataController = new DataController(this.dataService);

    this.server = express();
    this.handleAccessControl();
    this.server.use(this.handleError);
    this.registerRoutes();
  }

  start() {
    this.server.listen(APP_CONFIG.api.port, APP_CONFIG.api.host, () => {
      console.log(`Service is running on ${APP_CONFIG.api.host}:${APP_CONFIG.api.port}`);
    });
  }

  private registerRoutes(): void {
    this.server.use(this.dataController.router());
    // TO-DO swagger integration
    // this.server.use('/apidoc', swaggerUi.server, swaggerUi.setup(yamljs.load('path to swagger file')))
  }

  private handleAccessControl(): void {
    this.server.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      // Request methods you with to allow
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
      );
      // Request headers you wish to allow
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });
  }

  private handleError(
    err: express.Errback,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void {
    const error: HttpResponseError = err as any;
    res.status(error.code).send({ code: error.code, message: error.message });
  }
}