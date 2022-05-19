import express, { Request } from 'express';
import { DIContainer } from '../../inversify.config';
import { IGameService } from '../core';
import { GameMapper } from '../infrastructure';
import { DI } from '../../types';
import { MoveDTO } from './move.dto';
import { PositionMapper } from '../../position';
import { body } from 'express-validator';
import { isValidPosition, validateRequest } from '../../shared';

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
 *       summary: Start a new game
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
 *   /game/move:
 *     post:
 *       tags: ["Game"]
 *       summary: Move a piece
 *       requestBody:
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movement'
 *       responses:
 *         200:
 *           description: Piece moved
 *           content:
 *             application/json:
 *               schema:
 *                 allOf:
 *                   - $ref: '#/components/schemas/ApiResponse'
 *                   - type: object
 *                     properties:
 *                       data:
 *                         $ref: '#/components/schemas/Game'
 *         400:
 *           description: Invalid move | Not your turn | Game is over
 *         404:
 *           description: Game not started
 */
router.post(
  '/move',
  body('color', 'must be White or Black').custom((color) => ['White', 'Black'].includes(color)),
  body('from', 'must be a valid position').custom((position) => isValidPosition(position)),
  body('to', 'must be a valid position').custom((position) => isValidPosition(position)),
  async (req: Request, res, next) => {
    try {
      validateRequest(req);
      const { color, from, to }: MoveDTO = req.body;
      const game = await gameService.move(color, PositionMapper.toDomain(from), PositionMapper.toDomain(to));
      res.status(200).json({ data: GameMapper.toDTO(game) });
    } catch (err) {
      next(err);
    }
  }
);

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
 *     Position:
 *       type: object
 *       properties:
 *         file:
 *           type: string
 *           enum: ["A", "B", "C", "D", "E", "F", "G", "H"]
 *         rank:
 *           type: integer
 *           enum: [1, 2, 3, 4, 5, 6, 7, 8]
 *     Movement:
 *       type: object
 *       properties:
 *         color:
 *           type: string
 *           enum: ["White", "Black"]
 *         from:
 *           $ref: '#/components/schemas/Position'
 *         to:
 *           $ref: '#/components/schemas/Position'
 */

export default router;
