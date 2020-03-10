const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  item: String
});

ListSchema.plugin(findOrCreate);
module.exports = mongoose.model("List", ListSchema);
