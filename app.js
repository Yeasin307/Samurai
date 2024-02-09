require("dotenv").config();
const express = require('express');
const createError = require('http-errors');

const middlewares = require('./middlewares');
const bookRoute = require('./routes/bookRoute');
const { errorResponse } = require('./controllers/responseController');

const app = express();

// set middlewares 
middlewares(app);

// set routes
app.use('/api/books', bookRoute);


app.use((req, res, next) => {
    next(createError(404, 'route not found'));
    next();
});

app.use((err, req, res, next) => {
    return errorResponse(res, {
        // statusCode: err.status,
        message: err.message
    });
});


module.exports = app;
