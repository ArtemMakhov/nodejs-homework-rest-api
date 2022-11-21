const express = require('express');
const authController = require('../../controllers/authController');
const userController = require('../../controllers/userController');
const { asyncWrapper } = require('../../helpers/asyncWrapper');
const { validationBody } = require('../../middlewares/validationMiddleware');
const { upload } = require('../../middlewares/upload');
const { auth } = require('../../middlewares/auth');
const { schemaAuthValidation } = require('../../schemas/authSchemas');


const router = express.Router();

router.get('/current', auth, asyncWrapper(authController.getCurrent));
router.post('/signup',validationBody(schemaAuthValidation), asyncWrapper(authController.signup));
router.post('/login', asyncWrapper(authController.login));
router.post('/logout', auth, asyncWrapper(authController.logout));

router.patch('subscription', auth, asyncWrapper(userController.changeSubscriptionController));
router.patch('avatars', auth, upload.single("avatar"), asyncWrapper(userController.changeAvatarController));


module.exports = router