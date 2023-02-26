const express = require("express");

const app = express();

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config(); //importing dotenv
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler.js");

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); //Using MONGO_URI from .env
    app.listen(port, console.log(`server is listening on port ${port}... `));
  } catch (error) {
    console.log(error);
  }
};

start();
