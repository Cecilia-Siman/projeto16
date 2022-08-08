import { Router } from 'express';
import { signin } from "../controllers/signinController.js";

const signinRouter = Router();
signinRouter.post('/signin', signin);

export default signinRouter;