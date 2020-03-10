const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

var ItemSchema = new Schema({ item: String });
const ListSchema = new Schema({
  items: [ItemSchema]
});

ListSchema.plugin(findOrCreate);
module.exports = mongoose.model("List", ListSchema);
