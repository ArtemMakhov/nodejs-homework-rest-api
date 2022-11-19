const Contact = require("../models/schemas/contactSchema");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
}

const getContactById = async (contactId) => {
  const contactById = await Contact.findById(contactId).catch(() => {
    return null;
  });
  
  return contactById;
}

const addContact = async ({ name, email, phone, favorite = false }) => {
  const createdContact = await Contact.create({ name, email, phone, favorite });
  
  return createdContact;
}

const updateContact = async (id, fields) => {
  const updatedContact = await Contact.findByIdAndUpdate({ _id: id }, fields, { new: true })
    .catch(() => {
    return null;
    });
  
  return updatedContact;
}

const updateStatusContact = async (id, fields) => {
  const updatedStatusContact = await Contact.findByIdAndUpdate(
    { _id: id },
    fields,
    { new: true }
  ).catch(() => {
    return null;
  });

  return updatedStatusContact;
};

const removeContact = async (id) => {
  const removedContact = await Contact.findByIdAndRemove({ _id: id })
    .catch(() => {return null;}
 );

  return removedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
