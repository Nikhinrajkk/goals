const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const Goals = require('../models/goalModel');
const User = require('../models/userModel');

const JWT_SECRET = 'nkn123';

const generateJWT = ({ id }) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });

const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(201)
    .json({
      _id, name, email,
    });
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add missing fields');
  }

  // check for existing user
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    res.status(400);
    throw new Error(`User exists. ${isUserExist.email}`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201)
      .json({
        _id: user.id, name: user.name, email: user.email,
      });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter email and password');
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201)
      .json({
        _id: user.id, name: user.name, email: user.email, token: generateJWT({ id: user.id }),
      });
  } else {
    res.status(400);
    throw new Error('Please enter correct credentials');
  }

  const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ message: `Updated ${updatedGoal.id}` });
});

module.exports = {
  getMe, registerUser, loginUser,
};
