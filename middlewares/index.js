const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const middlewares = [
    cookieParser(),
    morgan('dev'),
    // cors({
    //     origin: process.env.CLIENT_URL,
    //     credentials: true
    // }),
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
];

module.exports = (app) => {
    middlewares.forEach(middleware => app.use(middleware));
};