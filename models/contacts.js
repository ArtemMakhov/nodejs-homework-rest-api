const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error);
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.error(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(({ id }) => id === contactId);
    if (idx === -1) return null;
  
    const [removeContact] = contacts.splice(idx, 1);
    await fs.writeFile(contactPath, JSON.stringify(contacts));
    return removeContact;
  } catch (error) {
    console.error(error);
  }
}

const addContact = async (body) => {
  try {
    const list = await listContacts();
    const newContact = { ...body,id: nanoid() };
    list.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(list));
    return newContact;
  } catch (error) {
    console.error(error);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const updateIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (updateIndex === -1) return false;

    contacts[updateIndex] = { ...contacts[updateIndex], ...body };

    await fs.writeFile(contactPath, JSON.stringify(contacts));

    return contacts[updateIndex];
    
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
