import express, { Application, Request, Response } from 'express';
import { injectable } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { DIContainer } from './DIContainer';
import './infrastructure/presentation/userController';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './infrastructure/presentation/swagger.json';
import { BaseException } from './application/exceptions';

@injectable()
export class Server {
  server: InversifyExpressServer;

  constructor() {
    this.server = new InversifyExpressServer(DIContainer, null, {
      rootPath: '/api',
    });
    this.server.setConfig((app: Application) => {
      app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
      });
      app.use(express.json({ limit: '50mb' }));
      app.use(express.urlencoded({ limit: '50mb', extended: true }));
      app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    });
  }

  start(): void {
    const apiServer = this.server.build();

    // Error handler
    apiServer.use(function (err: BaseException, req: Request, res: Response, next: CallableFunction) {
      console.error(err);
      const code = err.statusCode || 500;
      res.status(code).json({
        code: code.toString(),
        message: err.message || 'Internal Server Error',
      });
    });

    apiServer.listen(process.env.API_PORT, () => {
      console.log(`⚡️ Server is running in the container at http://localhost:${process.env.API_PORT}`);
      console.log(`💻 To access the API docs in your local machine go to http://localhost:${process.env.CONTAINER_PORT}/swagger`);
    });
  }
}
