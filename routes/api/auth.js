const express = require('express');
const authController = require('../../controllers/authController');
const { asyncWrapper } = require('../../helpers/asyncWrapper');
const { validationBody } = require('../../middlewares/validationMiddleware');
const { upload } = require('../../middlewares/upload');
const { auth } = require('../../middlewares/auth');
const { schemaAuthValidation } = require('../../schemas/authSchemas');


const router = express.Router();

router.get('/current', auth, asyncWrapper(authController.getCurrent));
router.post('/signup',validationBody(schemaAuthValidation), asyncWrapper(authController.signup));
router.post('/login', asyncWrapper(authController.login));
router.get('/verify/:verificationToken', asyncWrapper(authController.verifyEmail));
router.post('/logout', auth, asyncWrapper(authController.logout));
router.patch('/avatar',auth,upload.single("avatar"), asyncWrapper(authController.changeAvatarUrl));



module.exports = router