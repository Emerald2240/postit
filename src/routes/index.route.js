const express = require('express');
const router = express.Router();
const userRoute = require("./user.route");
const constants = require("../constants/constants");
const { MESSAGES } = constants;


router.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});
router.use("/user", userRoute);

module.exports = router;