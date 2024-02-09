const mongoose = require('mongoose');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const dbUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/`;

const connectDatabase = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log('Database connection established successfully');

        mongoose.connection.on('error', (err) => {
            console.error('Database connection error: ', err);
        });
    } catch (err) {
        console.error('Could not connect to database: ', err);
    }
}

module.exports = connectDatabase;