const express = require('express');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  getGoals, createGoals, deleteGoals, updateGoals,
} = require('../controllers/goalControllers');

router.route('/').get(protect, getGoals).post(protect, createGoals);
router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;
