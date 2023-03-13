//all modules/files/classes are imported and initialized
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const constants = require('./src/constants/constants');
const {MESSAGES} = constants;
const database = require("./src/database/database");
const jsonParserMiddleware = require('./src/middlewares/jsonParser.middleware');
const rootRoute = require("./src/routes/index.route");
const app = express();

//CORS ensures our app can be accessed by anyone. This is ofcourse not advisable for a live project
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//prevent app from crashing due to bad json request
app.use(jsonParserMiddleware);

//default route
app.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});

//documentation redirect
app.get("/docs", (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/24521226/2s93JtQioY');
});

//all requests of all types are pushed to this route to be handled
app.use('/api/v1', rootRoute);

//set our default port to 5000
const PORT = process.env.PORT || 5000;

//app/Server Start Section
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
    database();
});