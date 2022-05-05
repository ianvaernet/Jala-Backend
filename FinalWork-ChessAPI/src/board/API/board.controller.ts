// import express from 'express';
// import { DIContainer } from '../../inversify.config';
// import { DI } from '../../IocContainer';
// import { IBoardService } from '../core';
// import { BoardMapper } from '../infrastructure';

// export const router = express.Router();
// const boardService = DIContainer.get<IBoardService>(DI.IBoardService);

// /**
//  * @openapi
//  *   /board:
//  *     get:
//  *       tags: ["Board"]
//  *       summary: Get board
//  *       responses:
//  *         200:
//  *           description: Get the actual state of the board
//  *           content:
//  *             application/json:
//  *               schema:
//  *                 allOf:
//  *                   - $ref: '#/components/schemas/ApiResponse'
//  *                   - type: object
//  *                     properties:
//  *                       data:
//  *                         $ref: '#/components/schemas/Board'
//  */
// router.get('/', async function (req, res, next) {
//   try {
//     const board = await boardService.getBoard();
//     const boardDTO = BoardMapper.toDTO(board);
//     res.status(200).json({ data: boardDTO });
//   } catch (error) {
//     next(error);
//   }
// });

// /**
//  * @openapi
//  * components:
//  *   schemas:
//  *     ApiResponse:
//  *       type: object
//  *       properties:
//  *         message:
//  *          type: string
//  *         details:
//  *          type: string
//  *     Board:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: integer
//  *         grid:
//  *           type: string[][]
//  **/
