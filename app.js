//#region Setup and Initialisation ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//All modules/files/classes are imported and initialized
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const constants = require("./src/constants/constants");
const { MESSAGES } = constants;
const database = require("./src/database/database");
const app = express();


//CORS ensures our app can be accessed by anyone. This is ofcourse not advisable for a live project
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//channel to all routes
app.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});

//Set our default port to 5000
const PORT = process.env.PORT || 5000;


// App/Server Start Section
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
database();
});