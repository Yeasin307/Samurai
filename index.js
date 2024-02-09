const app = require('./app');
const connectDatabase = require('./config/dbConn');

app.listen(8000, async () => {
    console.log('Server is running successfully');

    await connectDatabase();
});