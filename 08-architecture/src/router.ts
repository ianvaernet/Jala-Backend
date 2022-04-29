import express from 'express';
import UserController from './user/API/user.controller';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const router = express.Router();

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ExpressCRUD API',
      version: '1.0.0',
      description: 'This is a simple CRUD API application made with Express',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
      },
    ],
  },
  apis: ['./src/controllers/user.controller.ts'],
});

router.use('/users', UserController);
router.use('/', swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }));

export default router;
