const express = require('express');

const router = express.Router();

const {
  getMe, registerUser, loginUser,
} = require('../controllers/userControllers');

const { protect } = require('../middleware/authMiddleware');

router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getMe);

module.exports = router;
