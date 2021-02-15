const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const commentSchema = new Schema({
  content: String,
  postId: String,
});

module.exports = model("Comment", commentSchema);
