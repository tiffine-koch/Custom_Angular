'use strict';

var app = angular.module('myApp');

app.service('UploadService', function($http) {
  this.fetch = function() {
    return $http.get('/uploads');
  }
  this.create = function(newUpload) {
    return $http.post('/uploads', newUpload);
  }

  this.edit = function(upload) {
    return $http.put(`/uploads/${upload.id}`);
  }

  this.remove = function(upload) {
    return $http.delete(`/uploads/${upload.id}`);
  }
});
