const express = require('express');
const { asyncWrapper } = require('../../helpers/asyncWrapper');
const { validationBody } = require("../../middlewares/validationMiddleware");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  changeFavoriteController
} = require('../../controllers/contactsController');
const {
  schemaPostContact,
  schemaPutContact,
  schemaPatchContact,
} = require("../../schemas/contactsSchemas");

const router = express.Router();


router.get('/', asyncWrapper(getContactsController));

router.get('/:contactId', asyncWrapper(getContactByIdController));

router.post('/', validationBody(schemaPostContact), asyncWrapper(addContactController));

router.delete('/:contactId', asyncWrapper(deleteContactController));

router.put('/:contactId', validationBody(schemaPutContact), asyncWrapper(updateContactController));

router.patch('/:contactId/favorite', validationBody(schemaPatchContact), asyncWrapper(changeFavoriteController));

module.exports = router
