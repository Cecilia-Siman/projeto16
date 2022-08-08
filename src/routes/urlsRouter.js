import { Router } from 'express';
import { 
    shortenUrl,
    urlById,
    urlRedirect,
    deleteUrl 
} from '../controllers/urlsController.js';

const shortenUrlRouter = Router();

shortenUrlRouter.post('/urls/shorten', shortenUrl);
shortenUrlRouter.get('/urls/:id', urlById);
shortenUrlRouter.get('/urls/open/:shortUrl', urlRedirect);
shortenUrlRouter.delete('/urls/:id',deleteUrl);

export default shortenUrlRouter;