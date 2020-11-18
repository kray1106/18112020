"use strict";

const Promise = require("bluebird");
const axios = require("axios");

let database = require("./database");

module.exports.getWeatherFromWeb = (param) => {
  // uncomment to trigger retrieving records from Database
  // return new Promise.resolve(false);

  // set default to HK, API required this feild
  let q = param.length > 2 ? param.substring(2) : "HongKong";

  return axios({
    method: "get",
    url:
      process.env.OPEN_WEATHER_URL +
      "?q=" +
      q +
      "&appid=" +
      process.env.OPEN_WEATHER_API_KEY,
    timeout: 1000 * 0, // in ms
  })
    .then((result) => {
      return database.updateRecord(result.data, q);
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      // try to get record from DB when API fails
      return new Promise.resolve(false);
    });
};

module.exports.getWeatherFromDB = (param) => {
  // set default to HK, API required this feild
  let q = param.length > 2 ? param.substring(2) : "HongKong";

  return new Promise.resolve(true)
    .then(() => {
      return database.getList(q);
    })
    .then((result) => {
      // console.log(result);
      let json = JSON.parse(result[0].data);
      json.source = "Database";
      return json;
    })
    .catch((e) => {
      console.log(e);
      return new Promise.reject(new Error("No Record Found"));
    });
};
