"use strict";

//
let restify = require("restify");
let Promise = require("bluebird");

//
require("dotenv").config();

//
let server = restify.createServer();
server.use(restify.plugins.bodyParser());

//
let Weather = require("./weather");
let TokenGenerator = require("./TokenGenerator");

//====================================================================================================================//
// Middleware
//====================================================================================================================//

server.use(restify.plugins.authorizationParser());

server.middleware = {
  authentication: function (req, res, next) {
    return new Promise.resolve()
      .then(() => {
        return TokenGenerator.verifyToken(req.authorization.credentials);
      })
      .then((result) => {
        next();
      })
      .catch((e) => {
        // throw ;
        res.status(403);
        next(new Error("Invalid_token"));
      });
  },
};

//***************************************************************************************//
//***************************************************************************************//

server.get("/generateToken", (req, res, next) => {
  new Promise.resolve(true)
    .then(() => {
      //
      return TokenGenerator.generate(req.getQuery());
    })
    .then((response) => {
      res.send({
        result: response,
      });
    })
    .catch((e) => {
      res.status(400);
      res.send({
        message: e.message,
      });
    })
    .finally(() => {
      return next();
    });
});

//
server.get("/weather", server.middleware.authentication, (req, res, next) => {
  new Promise.resolve(true)
    .then(() => {
      //
      return Weather.getWeatherFromWeb(req.getQuery());
    })
    .then((result) => {
      if (result == false) {
        //
        return Weather.getWeatherFromDB(req.getQuery());
      } else {
        result.source = "Web";
        return result;
      }
    })
    .then((response) => {
      res.send({
        result: response,
      });
    })
    .catch((e) => {
      res.status(400);
      res.send({
        message: e.message,
      });
    })
    .finally(() => {
      return next();
    });
});

// General Error handler
server.on("restifyError", async (req, res, err, callback) => {
  res.status(400);
  res.send({
    message: err.message,
  });
});

//#############################################################
server.listen(process.env.HOST_PORT || 8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});
