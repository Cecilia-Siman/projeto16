import { Router } from 'express';
import { signin } from "../controllers/signinController.js";
import { signinValidator } from '../middlewares/signinValidator.js';

const signinRouter = Router();
signinRouter.post('/signin', signinValidator, signin);

export default signinRouter;