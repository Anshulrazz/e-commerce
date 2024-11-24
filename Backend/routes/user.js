const express = require('express');
const router = express.Router();
const { register, login, logout, getCart, payment, getmyprofile, verify } = require('../cantroller/authcanrol');
const { authMiddleware } = require('../mid/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/cart', authMiddleware, getCart);
router.get('/payment',authMiddleware, payment);
router.post('/verify',authMiddleware, verify);
router.get('/logout', logout);
router.get('/me',authMiddleware, getmyprofile);
module.exports = router;
