const express = require('express');
const router = express.Router();
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const postitRoute = require("./postit.route");
const commentRoute = require("./comment.route");
const constants = require("../constants/constants");
const { MESSAGES } = constants;


router.get("/", (req, res) => {
    res.status(200).send({ message: MESSAGES.DEFAULT, success: true });
});

//documentation redirect
router.get("/docs", (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/24521226/2s93JtQioY');
});

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/postits", postitRoute);
router.use("/comments", commentRoute);


module.exports = router;