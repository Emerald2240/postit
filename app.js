//#region Setup and Initialisation ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//All modules/files/classes are imported and initialized
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const database = require("./src/database/database");
const rootRoute = require("./src/routes/index.route");
const app = express();

//CORS ensures our app can be accessed by anyone. This is ofcourse not advisable for a live project
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
const jsonParserMiddleware = require('./src/middlewares/jsonParser.middleware');

//Prevent app from crashing due to bad json request
app.use(jsonParserMiddleware);

//default route
app.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});

//documentation redirect
app.get("/docs", (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/24521226/2s93JtQioY');
});


//All requests of all types are pushed to this route to be handled
app.use('/api/v1', rootRoute);

//Set our default port to 5000
const PORT = process.env.PORT || 5000;


// App/Server Start Section
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
    database();
});