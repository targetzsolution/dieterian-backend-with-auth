import express from 'express';
import { userController } from '../../controllers/index.controller';
import auth from '../../middlewares/auth.middleware';

const router = express.Router();

router
  .route('/')
  .post(auth(), userController.createUser)
  .get(auth(), userController.getUsers);


router
  .route('/:userId')
  .get(auth(), userController.getUser)
  .patch(auth(), userController.updateUser)
  .delete(auth(), userController.deleteUser);

export default router;

