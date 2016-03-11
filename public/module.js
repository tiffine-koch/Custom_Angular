'use strict';

var app = angular.module('myApp', []);

app.controller("mainCtrl", function($scope, $http) {
  $scope.uploads = [];

  $http({
    method: "GET",
    url: "/uploads"
  }).then(function(response){
    console.log(response.data)
    $scope.uploads = response.data;
  }, function(error){
    console.log(error);
  });

  $scope.addUpload = function() {
    var upload = angular.copy($scope.upload);
    console.log(upload);
    $scope.uploads.push(upload);
    console.log($scope.uploads)
    $http({
      method: 'POST',
      url: '/uploads',
      data: upload
    }).then(function(response){
      swal("Your image has been uploaded!");
      console.log(response)
    }, function(error){
      console.log(error)
    })
    $scope.upload = {};
  }

  $scope.deleteUpload = function(upload){
    var id = upload.id;
    var index = $scope.uploads.indexOf(upload);
    $scope.uploads.splice(index, 1)

    console.log(upload)
    $http({
      method: 'DELETE',
      url: "/uploads/" + id
    })
    .then(function(data) {
      swal('Your upload has been deleted')
      console.log(data)
    })
  }

  $scope.editUpload = function(upload) {
    $('#demoModal').openModal();
    $('#modalButton').openModal();
    console.log('click me!');
    var id = upload.id;
    var index = $scope.uploads.indexOf(upload);
    $scope.uploads.splice(index, 1);
    $http({
      method: 'PUT',
      url: "/uploads/" + id,
    })
    .then(function(data){
      // addUpload();
      console.log('data', data);
    }, function(err){
      console.error(err);
    })
    $scope.upload = {};
  };
})
