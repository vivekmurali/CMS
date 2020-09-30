const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const postSchema = new Schema({
  title: String,
  content: String,
  tags: [String],
  siteTitle: String,
});

module.exports = model("Post", postSchema);
