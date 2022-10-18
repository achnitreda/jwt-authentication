require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dbConfig = require('./config/db.config')
require('./models');


app.get('/', (req, res) => {
    res.json(test)
})

// --------------- connect mongodb with mongoose
const mongoAtlasUri =
  `mongodb+srv://reda42:${dbConfig.pass}@cluster0.dqn8fht.mongodb.net/${dbConfig.db}?retryWrites=true&w=majority`;

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected"),
  );
} catch (e) {
  console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.listen(process.env.PORT)