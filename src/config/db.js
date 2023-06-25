const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

async function connectDb() {
  await mongoose.connect(mongoDB, { useNewUrlParser: true });
}
function close() {
  return mongoose.disconnect();
}
exports.connectDb = connectDb;
exports.close = close;
