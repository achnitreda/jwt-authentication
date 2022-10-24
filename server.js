const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

// Connect mongoose with mongodb Atlas
const db = `mongodb+srv://reda42:${process.env.DATABASE_PASS}@cluster0.dqn8fht.mongodb.net/jwt?retryWrites=true&w=majority`;
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected..."));
// .catch((err) => console.log(err));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// handle unhandled rejected promises
/* A global process object that is available in all modules. It is an instance of EventEmitter. It is
used to handle the events that are emitted by the Node.js process itself. */
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION Shut Down ...");
  /* Closing the server after request are completed. */
  server.close(() => {
    process.exit(1);
  });
});
