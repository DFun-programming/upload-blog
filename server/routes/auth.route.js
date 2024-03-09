const express= require('express');
const { signup, login, google } = require('../controllers/auth.controller');
const {isError}= require('../middleware/auth')
const router = express.Router();

//isError is to handle Error
//Route for signup
router.post('/signup',signup,isError);
//Route for login
router.post('/login',login,isError);
//Route for google login
router.post('/google',google,isError);


module.exports = router;