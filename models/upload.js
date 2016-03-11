'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var uploadsFilePath = path.join(__dirname, '../data/uploads.json');

exports.get = function(cb) {
  fs.readFile(uploadsFilePath, function(err, data) {
    if(err) return cb(err);
    var uploads = JSON.parse(data);
    cb(null, uploads);
  });
};

exports.create = function(newUpload, cb) {
  this.get((err, uploads) => {  // read and parse
    if(err) return cb(err);
    newUpload.id = uuid();
    console.log(newUpload.id);
    uploads.push(newUpload);   // modify
    this.write(uploads, function(err) { // stringify and write
      cb(err, newUpload);
    });
  });
};

exports.write = function(uploads, cb) {
  fs.writeFile(uploadsFilePath, JSON.stringify(uploads), cb);
};

exports.getById = function() {
}

exports.delete = function(id, cb) {
  this.get((err, uploads) => {

    var length = uploads.length;

    uploads = uploads.filter(function(upload) {
      return upload.id !== id;
    });

    if(length === uploads.length) {
      cb( {err: "Your upload not found."} );
      return;
    }

    this.write(uploads, cb);
  });
};


exports.update = function(id, updatesObj, cb) {
  this.get((err, uploads) => {
    var updatedUpload;

    uploads = uploads.map(function(upload) {
      if(upload.id === id) {
        // do the update
        for(var key in updatesObj) {
          upload[key] = updatesObj[key];
        }
        updatedUpload = upload;
      }
      return upload;
    });

    if(!updatedUpload) {
      cb( {err: "Upload not found."} );
      return;
    }

    this.write(uploads, function(err) {
      cb(err, updatedUpload)
    });
  });
};
