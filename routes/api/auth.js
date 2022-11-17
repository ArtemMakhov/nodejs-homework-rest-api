const express = require('express');
const authController = require('../../controllers/authController');
const { asyncWrapper } = require('../../helpers/asyncWrapper');
const { validationBody } = require('../../middlewares/validationMiddleware');
const { auth } = require('../../middlewares/auth');
const { schemaAuthValidation } = require('../../schemas/authSchemas');

const router = express.Router();

router.get('/current', auth, asyncWrapper(authController.getCurrent));
router.post('/signup',validationBody(schemaAuthValidation), asyncWrapper(authController.signup));
router.post('/login', asyncWrapper(authController.login));
router.post('/logout', auth, asyncWrapper(authController.logout));


module.exports = router