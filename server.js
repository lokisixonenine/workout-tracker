// initialize dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');

// initialize PORT
const PORT = process.env.PORT || 3000;

// set up express and mongoDB
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// set up routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

// PORT listener
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});