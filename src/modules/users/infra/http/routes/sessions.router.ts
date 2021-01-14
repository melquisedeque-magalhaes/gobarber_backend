import { Router } from 'express';

import SessionsController from '@modules/users/infra/http/controller/SectionsController';

const sessionRouter = Router();

const sessionsController = new SessionsController();

sessionRouter.post('/', sessionsController.create);

export default sessionRouter;
