const express = require('express');
const { signup, signin, logout } = require('../controllers/api/v1/auth_controller');
const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/logout', logout);

module.exports = router;