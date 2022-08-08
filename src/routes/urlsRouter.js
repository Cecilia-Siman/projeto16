import { Router } from 'express';
import { 
    shortenUrl,
    urlById,
    urlRedirect,
    deleteUrl 
} from '../controllers/urlsController.js';

import { tokenValidator } from '../middlewares/tokenValidator.js';
import { shortenValidator } from '../middlewares/shortenValidator.js';

const shortenUrlRouter = Router();

shortenUrlRouter.post('/urls/shorten', tokenValidator, shortenValidator, shortenUrl);
shortenUrlRouter.get('/urls/:id', urlById);
shortenUrlRouter.get('/urls/open/:shortUrl', urlRedirect);
shortenUrlRouter.delete('/urls/:id',tokenValidator,deleteUrl);

export default shortenUrlRouter;