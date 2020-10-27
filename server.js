const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const cors = require("cors");
const { MONGODB } = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;

const mongoClient = mongodb.MongoClient;
const url = MONGODB;

app.use(bodyParser.json())
app.use(cors({
    origin: "*"
}))

app.get("/", function (req, res) {
    res.write("<h1>API Working <h1>")
    res.end()
})

app.post("/user", async function (req, res) {

    let client;

    try {
        client = await mongoClient.connect(url);
        let db = client.db("react-form");
        let { name, email, country, state, city, address1, address2, gender, maritalstatus, favfood, favcolour } = req.body;
        let insertedUser = await db.collection("users").insertOne({
            name, email, country, state, city, address1, address2, gender, maritalstatus, favfood, favcolour
        });
        client.close();
        res.json({
            "stat": "200",
            "message": "User Successfully Inserted"
        });
        res.end();
    } catch (err) {
        client.close();
        console.log(err);
        res.json({
            "stat": "500",
            "message": "Error in inserting user"
        });
    }
})

app.get("/user", async function (req, res) {

    let client;

    try {
        client = await mongoClient.connect(url);
        let db = client.db("react-form");
        let users = await db.collection("users").find().toArray();
        client.close();
        res.json({
            users
        });
        res.end();
    } catch (err) {
        client.close();
        console.log(err);
        res.json({
            "stat": "500",
            "message": "Error in fetching user"
        });
    }
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});