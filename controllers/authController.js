// const { notFoundError } = require('../helpers/errors');
const { response } = require('../app');
const { User } = require('../models/schemas/userSchema');
// const {
//     listContacts,
//     getContactById,
//     addContact,
//     removeContact,
//     updateContact,
//     updateStatusContact,
// } = require('../models/contacts');

const register = async (req, res, next) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    return response.json({
        data: {
          user,
      }
  })
}
// const getContactsController = async (req, res, next) => {
//     const contacts = await listContacts();
//     res.status(200).json(contacts);
// }





module.exports = {
   register,
};