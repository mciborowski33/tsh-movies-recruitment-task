import { Router } from 'express';

import { sumTwoNumbers } from 'controllers/testControllers';

const apiRouter = Router();

apiRouter.get('/sum', sumTwoNumbers);

export default apiRouter;
