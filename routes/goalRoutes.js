const express = require('express');

const router = express.Router();

const {
  getGoals, createGoals, deleteGoals, updateGoals,
} = require('../controllers/goalControllers');

router.route('/').get(getGoals).post(createGoals);
router.route('/:id').put(updateGoals).delete(deleteGoals);

module.exports = router;
