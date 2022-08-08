import { Router } from 'express';
import { users } from '../controllers/usersController.js';
import { tokenValidator } from '../middlewares/tokenValidator.js' 

const usersRouter = Router();
usersRouter.get('/users/me',tokenValidator, users);

export default usersRouter;