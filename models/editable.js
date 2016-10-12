var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var EditableSchema = mongoose.Schema({
  name: {type: String, required: true },
  isFolder: { type: Boolean, default: false },
  editors: [{type: ObjectId, ref: "User"}],
  parentFolder: { type: ObjectId, ref: "Editable", default: null},
  folderContents: [{type: ObjectId, ref: "Editable"}],
  // TODO: Make documentText default to "Not a document".
  documentText: String
});

/**
 * Get all Editables that the user with the given ID can edit.
 * The callback is executed as callback(err, editables) where editables 
 * is an array of Editable objects.
 */
EditableSchema.statics.userEditables = function(userId, callback) {
  this.find({ "editors": userId }, callback);
};

/**
 * TODO: Make the following static method (call it moveToFolder).
 * It should take three arguments:
 * 1. editableId (must not be in any folder)
 * 2. folderId (must be a folder)
 * 3. callback
 * Move the Editable with the given ID into the folder with the given ID.
 * The callback should be executed as callback(err).
 *
 * Hint: You may find the following useful:
 * https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/#db.collection.updateOne
 */

var EditableModel = mongoose.model("Editable", EditableSchema);

module.exports = EditableModel;
