const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const userSchema = new Schema({
  email: String,
  password: String,
  date: {
    type: Date,
    default: new Date(),
  },
  siteTitle: String,
  logo: Buffer,
});

module.exports = model("User", userSchema);
