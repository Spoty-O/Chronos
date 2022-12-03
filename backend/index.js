require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/index');

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