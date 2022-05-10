//      routes/index.js
const express = require("express");

const chirpRouter = require("./chirpRouter");

const baseRouter = express.Router();

baseRouter.use("/api/chirps", chirpRouter);

module.exports = baseRouter; // Default export is our little router here
