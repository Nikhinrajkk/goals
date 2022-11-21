/* eslint-disable no-console */
const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('connect starts');
  try {
    const conn = await mongoose.connect('mongodb+srv://nikhinrajkk:B3Y3Q8rn4S9Wd9Vl@goalcluster.cjm6pft.mongodb.net/goal-app?retryWrites=true&w=majority');

    console.log(`mongodb listening on port ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(err);
    console.log('connect');
    process.exit(1);
  }
};

module.exports = connectDB;
