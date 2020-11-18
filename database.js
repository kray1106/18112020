"use strict";

const mongoose = require("mongoose");
const Promise = require("bluebird");

const uri =
  "mongodb://" +
  process.env.MONGODB_USER +
  ":" +
  process.env.MONGODB_PWD +
  "@" +
  process.env.MONGODB_HOST +
  ":" +
  process.env.MONGODB_PORT +
  "/" +
  process.env.MONGODB_DB +
  "?authSource=admin&w=1";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Schema = mongoose.Schema;
const WeatherSchema = new Schema({
  pk: String,
  data: String,
});

const Model = mongoose.model;
const Weather = Model("Weather", WeatherSchema);

//
module.exports.updateRecord = async (result, pk) => {
  let query = { pk: pk };

  try {
    await Weather.findOneAndUpdate(
      query,
      { $set: { data: JSON.stringify(result) } },
      { upsert: true }
    );

    return result;
  } catch (e) {
    throw new error(e.message);
  }
};

//
module.exports.getList = async (search) => {
  let arr = search.split(",");

  try {
    let response = await Weather.find({ pk: arr[0] });
    return response;
  } catch (e) {
    throw new error(e.message);
  }
};
