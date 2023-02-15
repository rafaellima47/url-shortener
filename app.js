require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/index');
const connectDb = require('./db/connection')


app = express();

let allowedOrigins = process.env.APPS_URL_LIST.split(',');
if (!allowedOrigins) {
    allowedOrigins = [];
}
const serverUrl = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;
allowedOrigins.push(serverUrl);

app.use(cors({
  origin: allowedOrigins
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDb();

app.use('/', routes);

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
})