'use strict';

var express = require('express');
var router = express.Router();

var Upload = require('../models/upload');

router.get('/', function(req, res) {
  Upload.get(function(err, uploads) {
    if(err) {
      res.status(400).send(err);
      return;
    }
    res.send(uploads);
  });
});

router.get('/:id', function(req, res) {
  var id = req.params.id;
  Upload.get(function(err, uploads) {
    if(err) {
      res.status(400).send(err);
      return;
    }

    var upload = uploads.find(function(obj) {
      return obj.id === id;
    });

    if(!upload) {
      res.status(404).send({err: "Upload not found"});
      return;
    }
    res.send(upload);
  });
});

router.post('/', function(req, res) {
  var newUpload = req.body;
  Upload.create(newUpload, function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(newUpload);
    }
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Upload.delete(id, function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  var updatesObj = req.body;
  Upload.update(id, updatesObj, function(err, updatedUpload) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(updatedUpload);
    }
  });
});


module.exports = router;
