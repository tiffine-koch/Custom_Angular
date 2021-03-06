'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, UploadService) {

  UploadService.fetch()
  .then(function(res) {
    var uploads = res.data;
    $scope.uploads = uploads;
  }, function(err) {
    console.error('err:', err);
  })

  $scope.addUpload = function() {
    UploadService.create($scope.newUpload)
    .then(function(res) {
      $scope.uploads.push(res.data);
    }, function(err) {
      console.error('err:', err);
      })
    };

  $scope.removeUpload = function(upload) {
    UploadService.remove(upload)
    .then(function(res) {
      var index = $scope.uploads.indexOf(upload);
      $scope.uploads.splice(index, 1);
    }, function(err) {
      console.error('err:', err);
    });
  }

  $scope.editUpload = function(upload) {
    UploadService.edit(upload)
    .then(function(res) {
      var index = $scope.uploads.indexOf(upload);
      $scope.uploads.splice(index, 1);
    }, function(err) {
      console.error('err:', err);
    });
  }

  $scope.cancelEdit = function() {
    $scope.uploadToEdit = null;
  }
});
