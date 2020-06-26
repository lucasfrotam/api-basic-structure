import * as express from 'express';
import { DataService } from './data.service';
import { BadRequestError, ServiceUnavailableError, NotFoundError } from '../../common/base/error';

export class DataController {
  constructor(private dataService: DataService) { }

  router = (): express.Router => {
    const router = express.Router();
    router.get('/data', this.getAllData);
    router.get('/data/:id', this.getItemById);
    return router;
  }

  getItemById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response | void> => {
    const id = req.params.id || null;
    if (!id) {
      next(new BadRequestError('ID is empty'));
      return;
    }

    try {
      const item = await this.dataService.findItemById(id);
      if (item) {
        res.status(200).send(item);
      } else {
        next(new NotFoundError('No record found with this ID'));
      }
    } catch (e) {
      next(new ServiceUnavailableError(e.message));
      return;
    }
  }

  getAllData = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response | void> => {
    // const params = req.query
    try {
      // const data = await this.dataService.getAllData();
      // res.status(200).send(data);
      res.status(200).send('OK');
    } catch (e) {
      next(new ServiceUnavailableError(e.message));
      return;
    }
  }
}
