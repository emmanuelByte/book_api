const mongoose = require("mongoose");
const { importBookToDB } = require("../script/books.script");
const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

async function connectDb() {
  await mongoose.connect(mongoDB, { useNewUrlParser: true });

  // We don't need to import books to DB every time we start the server
  // await importBookToDB();
}
function close() {
  return mongoose.disconnect();
}
exports.connectDb = connectDb;
exports.close = close;
