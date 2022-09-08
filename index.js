require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// *************************** importing npm packages ***************************//
const cookieParser = require('cookie-parser');
const morgan = require('morgan')

// *************************** importing connect to database ***************************//
const connectdb = require('./config/db/connectDB');

// *************************** importing error handler ***************************//
const errorHandler = require('./config/middleware/error_handler');

// *************************** importing page not found middleware ***************************//
const pageNotFound = require('./config/middleware/page_not_found');

// *************************** importing routes **************************//
const routes = require('./routes/index')

// *************************** logger **************************//
app.use(morgan("tiny"));

// *************************** cookie parsing middleware *************************//
app.use(cookieParser()) //unsigned cookie

// *************************** body parsing middleware *****************************//
app.use(express.json());

// *************************** main routes **************************//
app.use('/api/v1', routes);

// *************************** using page not found **************************//
app.use(pageNotFound);

// *************************** using error handler **************************//
app.use(errorHandler);

// *************************** Spinning up the server *****************************//
const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectdb(process.env.MONGODB_URL);
        app.listen(PORT, () => console.log(`Server is up and running at port ${PORT}`))
    } catch (error) {
        console.log("Error while starting server");
    }
}

start();