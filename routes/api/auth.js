const express = require('express');
const authController = require("../../controllers/authController");
const { asyncWrapper } = require('../../helpers/asyncWrapper');

const router = express.Router();

router.post('/register',  asyncWrapper(authController.register));

module.exports = router