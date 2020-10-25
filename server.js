
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const cors = require("cors");

// defining variables
const app = express();
const PORT = process.env.PORT || 5000;





app.listen(PORT, () => {
    console.log("Server is running")
})