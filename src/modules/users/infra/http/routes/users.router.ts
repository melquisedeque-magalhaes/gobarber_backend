import { Router } from 'express';

import multer from 'multer';

import UserController from '@modules/users/infra/http/controller/UserController';
import UserAvatarController from '@modules/users/infra/http/controller/UserAvatarController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const userRouter = Router();
const upload = multer(uploadConfig);

const userController = new UserController();
const userAvatarController = new UserAvatarController();

userRouter.get('/', userController.index);

userRouter.post('/', userController.create);

userRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);

export default userRouter;
