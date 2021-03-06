import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import http from 'http';
import router from './router';
import { BaseException, mySQLDataSource } from './shared';

export const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

// Error handler
app.use(function (err: BaseException, req: Request, res: Response, next: CallableFunction) {
  // eslint-disable-next-line no-console
  console.error(err);
  res
    .status(err.statusCode || 500)
    .send({ message: err.message || 'Internal Server Error', details: err.details });
});
app.use(function (req: Request, res: Response, next: CallableFunction) {
  res.status(404).send('Error 404: Not Found');
});

app.set('port', process.env.PORT);
const server = http.createServer(app);
if (process.env.NODE_ENV !== 'test') {
  mySQLDataSource
    .initialize()
    .then(() => {
      server.listen(process.env.PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`⚡️ Server running at http://localhost:${process.env.HOST_PORT}`);
      });
    }) // eslint-disable-next-line no-console
    .catch((error) => console.error(error));
}
