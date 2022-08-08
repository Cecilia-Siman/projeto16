import { Router } from 'express';
import { users } from '../controllers/usersController.js';

const usersRouter = Router();
usersRouter.get('/users/me', users);

export default usersRouter;