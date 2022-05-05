import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import GameController from './game/API/game.controller';

const router = express.Router();

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chess API',
      version: '1.0.0',
      description: 'This is an API to play Chess',
    },
    servers: [
      {
        url: 'http://localhost:8000/api',
      },
    ],
  },
  apis: ['./src/**/API/*.controller.ts'],
});

router.use('/game', GameController);
router.use('/', swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }));

export default router;
