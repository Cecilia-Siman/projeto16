import { Router } from 'express';
import { ranking } from '../controllers/rankingController.js';

const rankingRouter = Router();
rankingRouter.get('/ranking', ranking);

export default rankingRouter;