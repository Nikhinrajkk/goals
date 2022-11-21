/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const colors = require('colors');

const port = process.env.PORT || 7001;
const app = express();
// const dotenv = require('dotenv').config();
// const cors = require('cors');
// const morgan = require('morgan');

const connectDb = require('./config/db');

connectDb();

const { errorHandler } = require('./middleware/errorMiddleware');

// app.use(morgan("dev"))
// app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(errorHandler);
// app.use(colors);
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
