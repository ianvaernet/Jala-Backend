import express, { Request } from 'express';
import { DIContainer } from '../../inversify.config';
import { IGameService } from '../core';
import { GameMapper } from '../infrastructure';
import { DI } from '../../types';

const gameService = DIContainer.get<IGameService>(DI.IGameService);
const router = express.Router();

/**
 * @openapi
 *   /game:
 *     get:
 *       tags: ["Game"]
 *       summary: Get current game
 *       responses:
 *         200:
 *           description: Get current game
 *           content:
 *             application/json:
 *               schema:
 *                 allOf:
 *                   - $ref: '#/components/schemas/ApiResponse'
 *                   - type: object
 *                     properties:
 *                       data:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Game'
 */
router.get('/', async function (req, res, next) {
  try {
    const game = await gameService.getGame();
    res.status(200).json({ data: GameMapper.toDTO(game) });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 *   /game:
 *     post:
 *       tags: ["Game"]
 *       summary: Starts a new game
 *       responses:
 *         200:
 *           description: Game started
 *           content:
 *             application/json:
 *               schema:
 *                 allOf:
 *                   - $ref: '#/components/schemas/ApiResponse'
 *                   - type: object
 *                     properties:
 *                       data:
 *                         $ref: '#/components/schemas/Game'
 */
router.post('/', async (req: Request, res, next) => {
  try {
    const game = await gameService.startNewGame();
    res.status(201).json({ data: GameMapper.toDTO(game) });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * components:
 *   schemas:
 *     ApiResponse:
 *       type: object
 *       properties:
 *         message:
 *          type: string
 *         details:
 *          type: string
 *     Game:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         board:
 *          type: string
 *         turn:
 *          type: string
 */

export default router;
