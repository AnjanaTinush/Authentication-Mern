const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
    cors({
        origin:["http://localhost:3000","https://authz-app.vercel.app"],
        credentials :true
    })
)

// Use middlewares
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Home Page");
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
