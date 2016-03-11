'use strict';

var app = angular.module('myApp', []);

app.controller("mainCtrl", function($scope, $http) {
  $scope.uploads = [];

  $http({
    method: "GET",
    url: "/uploads"
  }).then(function(response){
    $scope.uploads = response.data;
  }, function(error){
  });

  $scope.addUpload = function() {
    var upload = angular.copy($scope.upload);
    $scope.uploads.push(upload);
    $http({
      method: 'POST',
      url: '/uploads',
      data: upload
    }).then(function(response){
      swal("Your image has been uploaded!");
    }, function(error){
    })
    $scope.upload = {};
  }

  $scope.deleteUpload = function(upload){
    var id = upload.id;
    var index = $scope.uploads.indexOf(upload);
    $scope.uploads.splice(index, 1)

    $http({
      method: 'DELETE',
      url: "/uploads/" + id
    })
    .then(function(data) {
      swal('Your upload has been deleted')
    })
  }

  $scope.editUpload = function(upload) {
    $('#demoModal').openModal();
    $('#modalButton').openModal();
    var id = upload.id;
    var index = $scope.uploads.indexOf(upload);
    $scope.uploads.splice(index, 1);
    $http({
      method: 'PUT',
      url: "/uploads/" + id,
    })
    .then(function(data){
    }, function(err){
    })
    $scope.upload = {};
  };
})
