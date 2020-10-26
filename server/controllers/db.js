const mongoose = require("mongoose");

const init = () => {
  mongoose.connect("mongodb://localhost:27017/iwp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection.on("error", (err) => {
    console.error(err.message);
  });
  mongoose.connection.once("open", () => {
    console.log("connected to database");
  });
};

module.exports = { init, mongoose };
