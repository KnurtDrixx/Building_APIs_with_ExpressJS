const express = require("express");
const cors = require("cors");
const apiRoute = require("./routes");
let app = express();
app.use(cors());
app.use(express.json());

app.use("/", apiRoute);

app.listen(3000);
