import express, { Request } from 'express';
import { body } from 'express-validator';
import { BadRequestException } from '../../shared';
import { DI, DIContainer } from '../../inversify.config';
import { UserMapper } from '../infrastructure';
import { IUserService } from '../core';
import { validateRequest } from '../../shared';

const router = express.Router();
const userService = DIContainer.get<IUserService>(DI.IUserService);

/**
 * @openapi
 *   /users:
 *     get:
 *       tags: ["Users"]
 *       summary: List users
 *       responses:
 *         200:
 *           description: List of users
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
 *                           $ref: '#/components/schemas/User'
 */
router.get('/', async function (req, res, next) {
  try {
    const users = await userService.listUsers({});
    const userDTOs = users.map((user) => UserMapper.toDTO(user));
    res.status(200).json({ data: userDTOs });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 *   /users:
 *     post:
 *       tags: ["Users"]
 *       summary: Create a user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUser'
 *       responses:
 *         200:
 *           description: User created
 *           content:
 *             application/json:
 *               schema:
 *                 allOf:
 *                   - $ref: '#/components/schemas/ApiResponse'
 *                   - type: object
 *                     properties:
 *                       data:
 *                         $ref: '#/components/schemas/User'
 *         400:
 *           description: Error in some input values
 */
router.post(
  '/',
  body('firstName', 'cannot be empty').isString().notEmpty(),
  body('lastName', 'cannot be empty').isString().notEmpty(),
  body('email', 'must be a valid email').isEmail(),
  body('email', 'cannot have more than 100 characters').isLength({ max: 100 }),
  body('password', 'must be at least 8 characters').isString().isLength({ min: 8 }),
  body('password', 'cannot have more than 100 characters').isString().isLength({ max: 100 }),
  async (req: Request, res, next) => {
    try {
      validateRequest(req);
      const user = await userService.createUser(req.body);
      res.status(201).json({ data: UserMapper.toDTO(user) });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @openapi
 *   /users/{id}:
 *     get:
 *       tags: ["Users"]
 *       summary: Get user by id
 *       parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *       responses:
 *         200:
 *           description: The requested user
 *           content:
 *             application/json:
 *               schema:
 *                 allOf:
 *                   - $ref: '#/components/schemas/ApiResponse'
 *                   - type: object
 *                     properties:
 *                       data:
 *                         $ref: '#/components/schemas/User'
 *         400:
 *           description: Invalid user id
 *         404:
 *           description: User not found
 */
router.get('/:id', async function (req, res, next) {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) throw new BadRequestException('Invalid user id');
    const user = await userService.getUser(userId);
    const userDTO = UserMapper.toDTO(user);
    res.status(200).json({ data: userDTO });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 *   /users/{id}:
 *     put:
 *       tags: ["Users"]
 *       summary: Update user by id
 *       parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUser'
 *       responses:
 *         200:
 *           description: The updated user
 *           content:
 *             application/json:
 *               schema:
 *                 allOf:
 *                   - $ref: '#/components/schemas/ApiResponse'
 *                   - type: object
 *                     properties:
 *                       data:
 *                         $ref: '#/components/schemas/User'
 *         400:
 *           description: Invalid user id
 *         404:
 *           description: User not found
 */
router.put('/:id', async function (req, res, next) {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) throw new BadRequestException('Invalid user id');
    const user = await userService.updateUser(userId, req.body);
    const userDTO = UserMapper.toDTO(user);
    res.status(200).json({ data: userDTO });
  } catch (error) {
    next(error);
  }
});

/**
 * @openapi
 *   /users/{id}:
 *     delete:
 *       tags: ["Users"]
 *       summary: Delete a user by id
 *       parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *       responses:
 *         200:
 *           description: User deleted
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ApiResponse'
 *         400:
 *           description: Invalid user id
 *         404:
 *           description: User not found
 */
router.delete('/:id', async function (req, res, next) {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) throw new BadRequestException('Invalid user id');
    await userService.deleteUser(userId);
    res.status(200).json({ message: 'User successfully deleted' });
  } catch (error) {
    next(error);
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
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *          type: string
 *     CreateUser:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *       - firstName
 *       - lastName
 *       - email
 *       - password
 *     UpdateUser:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 */

export default router;
