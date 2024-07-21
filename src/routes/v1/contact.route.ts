import express from 'express';
import { contactController } from '../../controllers/index.controller';

const router = express.Router();

router
  .route('/')
  .post(contactController.createContact)
  .get(contactController.getContacts);

router
  .route('/:contactId')
  .get(contactController.getContact)
  .patch(contactController.updateContact)
  .delete(contactController.deleteContact);


export default router;