(function() {
  'use strict';
  angular.module('app')
  .factory('CommentFactory', CommentFactory);

  function CommentFactory($http, $q, $window) {
    var o = {};

    o.getPostById = function(id) {
      var q = $q.defer();
      $http.get('/api/v1/comments/' + id).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.createComment = function(id, comment){
      var q = $q.defer();
      $http.post("/api/v1/comments/" + id, comment, { headers : { authorization : "Bearer " + $window.localStorage.getItem("token")}}).then(function(res){
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.updateComment = function(newcom, oldcom) {
      // console.log('factory: new comment:');
      // console.log(newcom);
      // console.log('factory: old comment:');
      // console.log(oldcom);
      var q = $q.defer();
      $http.put('/api/v1/comments/' + oldcom._id, newcom).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.deleteComment = function(id){
      var q = $q.defer();
      $http.delete("/api/v1/comments/" + id).then(function(res){
        q.resolve(res.data);
      });
      return q.promise;
    };

    return o;
  };
})();
