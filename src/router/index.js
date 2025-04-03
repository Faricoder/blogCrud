const express = require("express");

const router = express.Router();

const saveursRouter = require("./saveursRouter");

router.get("/",(req,res)=>{
    res.status(200).send('je suis la' "http://localhost:4242/api" )
})

router.use("/saveurs", saveursRouter);

module.exports = router;
