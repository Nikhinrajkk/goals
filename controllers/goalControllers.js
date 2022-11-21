const asyncHandler = require('express-async-handler');

const Goals = require('../models/goalModel');

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goals.find();

  res.status(200).json(goals);
});

const createGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add text');
  }

  const goal = await Goals.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

const updateGoals = asyncHandler(async (req, res) => {
  if (!req.body.text || !req.params.id) {
    res.status(400);
    throw new Error('Please add text or id');
  }

  const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ message: `Updated ${updatedGoal.id}` });
});

const deleteGoals = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error('Please add id');
  }

  const goal = await Goals.findById(req.params.id);

  await goal.remove();

  res.status(200).json({ message: `Deleted ${req.params.id}` });
});

module.exports = {
  getGoals, createGoals, updateGoals, deleteGoals,
};
