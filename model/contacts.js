const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { promises: fsPromise } = fs;

const contactsPath = path.join(__dirname, '', 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fsPromise.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    errHandle(err);
  }
};


const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find(({ id }) => id.toString() === contactId.toString());
  } catch (err) {
    errHandle(err);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const deletedContact = await getContactById(contactId);

    const newList = contacts.filter(
      ({ id }) => id.toString() !== contactId.toString(),
    );

    await fsPromise.writeFile(contactsPath, JSON.stringify(newList));
    return deletedContact
      ? { message: 'contact deleted successefull!!' }
      : null;
  } catch (err) {
    errHandle(err);
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const id = uuidv4()
    const record = {
      id,
      ...body,
    }
    contacts.push(record);
    await fsPromise.writeFile(contactsPath, JSON.stringify(contacts));
    return record;
  } catch (err) {
    errHandle(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactToUpdate = await getContactById(contactId);

    const updatedContact = Object.assign(contactToUpdate, body);

    const updatedContactsList = contacts.filter(
      ({ id }) => id.toString() !== contactId.toString(),
    );

    updatedContactsList.push(updatedContact);

    await fsPromise.writeFile(
      contactsPath,
      JSON.stringify(updatedContactsList),
    );
    return updatedContact.id ? updatedContact : null;
  } catch (err) {
    errHandle(err);
  }
}

function errHandle(error) {
  console.log(error.message);
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
