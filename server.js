// add dependencies
require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const mongojos = require("mongojs");
const mongoose = require("mongoose");
const path = require("path");

// add port for localhost
const PORT = process.env.PORT || 8000;

const User = require("./models/models");
const app = express();
app.use(logger("dev"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));

// initialize noSQL DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true
});

// add file routes to get parts of data
app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/exercise", (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

app.get("/stat", (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

// add workout api
app.get("/api/workouts", (_, res) => {
    User.find()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/api/workouts", (_, res) => {
    User.create({})
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});

app.put("/api/workouts/:id", ({
    body,
    params
}, res) => {
    User.findByID(params.id, {
            $push: {
                exercise: body
            }
        }, {
            new: true,
            runValidators: true
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/api/workouts/range", (_, res) => {
    User.find()
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.json(err);
    });
});

// localhost port listen
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT} yo! Git yer workout done son!`);
});