import { Router } from 'express';
import { signup } from "../controllers/signupController.js";

const signupRouter = Router();
signupRouter.post('/signup', signup);

export default signupRouter;