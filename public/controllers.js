'use strict';

//no array, referencing a pre-existing module
var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, UploadService) {
  console.log('inside controller.js');

  UploadService.sayHi();
  console.log(UploadService.numbers);

  UploadService.fetch() //this returns the promise
  .then(function(res) { //we do this in the controller, bc the controller has our scope
    console.log('res:', res);
    var uploads = res.data;
    $scope.uploads = uploads;
  }, function(err) {
    console.error('err:', err);
  })

  $scope.addUpload = function() {
    console.log($scope.newUpload);
    UploadService.create($scope.newUpload) //this returns the promise
    .then(function(res) { //we do this in the controller, bc the controller has our scope
      console.log('res:', res.data);
      $scope.uploads.push(res.data); //update array with new upload
    }, function(err) {
      console.error('err:', err);
      })
    };

  $scope.removeUpload = function(upload) {
    console.log('upload:', upload);
    UploadService.remove(upload)
    .then(function(res) {
      var index = $scope.uploads.indexOf(upload);
      $scope.uploads.splice(index, 1);
    }, function(err) {
      console.error('err:', err);
    });
  }

  $scope.editUpload = function(upload) {
    console.log('click');
    $scope.uploadToEdit = angular.copy(upload);
  }

  $scope.cancelEdit = function() {
    $scope.uploadToEdit = null;
  }
});
