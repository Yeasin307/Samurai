require("dotenv").config();
const express = require('express');
const createError = require('http-errors');

const middlewares = require('./middlewares');

const userRoute = require('./routes/userRoute');
const stationRoute = require('./routes/stationRoute');
const trainRoute = require('./routes/trainRoute');
const ticketRoute = require('./routes/ticketRoute');

//adding by Prohlad Mandal
const walletRoute = require('./routes/walletsRoute');


const { errorResponse } = require('./controllers/responseController');

const app = express();

// set middlewares 
middlewares(app);

// set routes
app.use('/api/users', userRoute);
app.use('/api/stations', stationRoute);
app.use('/api/trains', trainRoute);
app.use('/api/wallets', walletRoute)
app.use('/api/tickets', ticketRoute)


app.use((req, res, next) => {
    next(createError(404, 'route not found'));
    next();
});

app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    });
});


module.exports = app;
