var assert = require("assert");
var mongoose = require("mongoose");
var User = require("../models/user");
var Editable = require("../models/editable");

describe("App", function() {
  // The mongoose connection object.
  var con;

  // Before running any test, connect to the database.
  before(function(done) {
    con = mongoose.connect("mongodb://localhost/geditables", function() {
      done();
    });
  });

  // Delete the database before each test.
  beforeEach(function(done) {
    con.connection.db.dropDatabase(function() { done(); });
  });

  describe("User", function() {
    it("should have a profile field", function(done) {
      User.create({
        "name": "testuser",
        "email": "testuser@mit.edu",
        "profile": {
          "pathToProfilePic": "path/to/this",
          "bio": "I am a user"
        }
      }, function() {
        User.findOne({"name": "testuser"}, function(err, doc) {
          assert.strictEqual(doc.profile.bio, "I am a user");
          done();
        });
      });
    }); // End it should have a profile field.

    it("should not allow usernames to exceed 10 chars", function(done) {
      User.create({"name": "mynameiswaytoolong"}, function(err, doc) {
        assert.throws(function() {
          assert.ifError(err);
        });
        done();
      });
    });
  }); // End describe User.

  describe("Editable", function() {
    it("should have default document text", function(done) {
      Editable.create({"name": "My first doc"}, function(err, doc) {
        assert.strictEqual(doc.documentText, "Not a document");
        done();
      });
    });

    it("should move into folders", function(done) {
      var rooteditables = [
        {"name": "d1", "documentText": "first"}, 
        {"name": "d2", "isFolder": "true"}
      ];
      Editable.create(rooteditables, function(err, editables) {
        var editableId = editables[0]._id;
        var folderId = editables[1]._id;

        Editable.moveToFolder(editableId, folderId, function() {
          Editable.find({}, function(err, editables) {
            assert.strictEqual(editables.length, 2);
            var folder = (editables[0].isFolder) ? editables[0] : editables[1];
            var doc = (editables[0].isFolder) ? editables[1] : editables[0];
            assert.strictEqual(doc.parentFolder.toString(), folderId.toString());
            assert.strictEqual(folder.folderContents[0].toString(), editableId.toString());
            done();
          });
        });
      });
    }); // End it should move into folders.
  }); // End describe Editable.
}); // End describe App.
