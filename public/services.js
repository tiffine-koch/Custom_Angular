'use strict';

//no array, referencing a pre-existing module
var app = angular.module('myApp');

//service use this
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
