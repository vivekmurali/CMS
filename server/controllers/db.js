const mongoose = require("mongoose");

const init = () => {
  mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("error", (err) => {
    console.error(err.message);
  });
  mongoose.connection.once("open", () => {
    console.log("connected to database");
  });
};

module.exports = { init, mongoose };
