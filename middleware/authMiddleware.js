/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const JWT_SECRET = 'nkn123';

  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1];

      const decodedToken = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decodedToken.id).select('-password');
      next();
    } catch (err) {
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No token');
  }
});

module.exports = { protect };
