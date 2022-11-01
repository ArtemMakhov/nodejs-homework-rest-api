const express = require('express')

const {
  addContactValidation,
  updateContactValidation
} = require('../../middlewares/validationMiddleware');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../models/contacts');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts)
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json(contact);
})

router.post('/', addContactValidation,async (req, res, next) => {
  const newContactData = req.body;
  const newContact = await addContact(newContactData);

  res.status(201).json(newContact);
  
})

router.delete('/:contactId', async (req, res, next) => {
  const contactRemoved = await removeContact(req.params.contactId);
  if (!contactRemoved) return res.status(404).json({ message: "Not found" });

  res.status(200).json({ message: "Contact deleted" });
})

router.put('/:contactId',updateContactValidation, async (req, res, next) => {
  const updatedContact = await updateContact(req.params.contactId, req.body);
  if (!updatedContact) return res.status(404).json({ message: "Not found" });

  res.status(200).json(updatedContact);
})

module.exports = router
