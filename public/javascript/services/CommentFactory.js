(function() {
  'use strict';
  angular.module('app')
  .factory('CommentFactory', CommentFactory);

  function CommentFactory($http, $q) {
    var o = {};

    o.getPostById = function(id) {
      var q = $q.defer();
      $http.get('/api/v1/posts/' + id).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

    return o;
  }
})();
