import express from "express";
import { bmiController } from "../../controllers/index.controller";
import auth from "../../middlewares/auth.middleware";

const router = express.Router();

router
  .route('/')
  .post(auth(), bmiController.createBMI)
  .get(auth(), bmiController.getBMIs);

router
  .route('/:bmiId')
  .get(auth(), bmiController.getBMI)
  .patch(auth(), bmiController.updateBMI)
  .delete(auth(), bmiController.deleteBMI);


export default router;