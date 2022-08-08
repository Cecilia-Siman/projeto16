import { Router } from 'express';
import { signup } from "../controllers/signupController.js";
import { signupValidator } from '../middlewares/signupValidator.js';

const signupRouter = Router();
signupRouter.post('/signup', signupValidator, signup);

export default signupRouter;