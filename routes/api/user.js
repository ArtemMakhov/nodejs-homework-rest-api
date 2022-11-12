const express = require('express');
const usersController = require('../../controllers/usersController');
const { asyncWrapper } = require('../../helpers/asyncWrapper');
const { auth } = require('../../middlewares/auth');

const router = express.Router();

router.get('/contacts',auth, asyncWrapper(usersController.getContacts));
router.post('/contacts',  auth, asyncWrapper(usersController.createContact));

module.exports = router