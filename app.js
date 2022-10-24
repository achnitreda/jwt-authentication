const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');

const app = express();

/* A middleware that parses the body of the request and makes it available on the request object. */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//
app.use((req,res,next) => {
  // console.log(req.headers)
  next();
})

// ROUTES
app.use("/api/v1/users", userRouter);


/* A ROUTE HANDLER */
app.all('*', (req,res,next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`,404));
  // when there is a arg in next go direct to err middleware and pass others 
});

app.use(globalErrorHandler);

module.exports = app;