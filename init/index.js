require('dotenv').config();
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

function pickDefaultCoordinatesFor(location) {
  // crude defaults to satisfy schema; adjust as needed per location
  switch ((location || "").toLowerCase()) {
    case "new york city":
      return [-74.006, 40.7128];
    case "los angeles":
      return [-118.2437, 34.0522];
    case "malibu":
      return [-118.7798, 34.0259];
    case "florence":
      return [11.2558, 43.7696];
    case "amsterdam":
      return [4.9041, 52.3676];
    case "bali":
      return [115.1889, -8.4095];
    case "aspen":
      return [-106.8175, 39.1911];
    case "miami":
      return [-80.1918, 25.7617];
    case "phuket":
      return [98.3381, 7.8804];
    case "dubai":
      return [55.2708, 25.2048];
    case "banff":
      return [-115.5708, 51.1784];
    default:
      return [0, 0];
  }
}

const initDB = async () => {
  await Listing.deleteMany({});
  const dataWithRequiredFields = initData.data.map((obj) => {
    const coordinates = pickDefaultCoordinatesFor(obj.location);
    return {
      ...obj,
      owner: obj.owner || "68b96ce0c1c80ecfda1333e2",
      geometry: obj.geometry || { type: "Point", coordinates },
    };
  });
  await Listing.insertMany(dataWithRequiredFields);
  console.log("data was initialize");
  await mongoose.connection.close();
};

initDB();
