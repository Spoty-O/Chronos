require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = require('./routes/index');
// const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

const app = express();
app.use(cors({
    credentials: true,
    origin: true
}));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "static")));
app.use(cookieParser());
app.use('/api', router);
// app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => { console.log(`http://${HOST}:${PORT}`) });
    } catch (e) {
        console.log(e);
    }
}

start();