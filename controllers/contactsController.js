const { notFoundError } = require('../helpers/errors');
const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
} = require('../models/contacts');


const getContactsController = async (req, res, next) => {
    const contacts = await listContacts();
    res.status(200).json(contacts);
}

const getContactByIdController = async (req, res, next) => {
    const contact = await getContactById(req.params.contactId);
    if (!contact) throw notFoundError;
    res.status(200).json(contact);
}

const addContactController = async (req, res, next) => {
    const newContactData = req.body;
    const newCreatedContact = await addContact(newContactData);
    res.status(201).json(newCreatedContact);
}

const deleteContactController = async (req, res, next) => {
    const contactRemoved = await removeContact(req.params.contactId);
    if (!contactRemoved) throw notFoundError;
    res.status(200).json({ message: "Contact deleted" });
}

const updateContactController = async (req, res, next) => {
    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) throw notFoundError;
    res.status(200).json(updatedContact);
}

const changeFavoriteController = async (req, res, next) => {
    const updatedContact = await updateStatusContact(req.params.contactId, req.body);
    if (!updatedContact) throw notFoundError;
    res.status(200).json(updatedContact);
}


module.exports = {
    getContactsController,
    getContactByIdController,
    addContactController,
    deleteContactController,
    updateContactController,
    changeFavoriteController
};