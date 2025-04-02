const express = require("express");

const cors = require("cors");

const router = require("./router");

const app = express();

app.use(cors("*"));
app.use(express.json());

//get http:/localhost:4242/
app.get("/", (req, res) => {
	res.status(200).send("je suis en place 'http://localhost:4242");
});

app.use("/api", router);

module.exports = app;
