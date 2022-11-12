const express = require('express');
const authController = require('../../controllers/authController');
const { asyncWrapper } = require('../../helpers/asyncWrapper');
const { auth } = require('../../middlewares/auth');

const router = express.Router();

router.post('/register', asyncWrapper(authController.register));
router.post('/login', asyncWrapper(authController.login));
router.post('/logout', auth, asyncWrapper(authController.logout));

module.exports = router