(function() {
  'use strict';
  angular.module('app')
  .factory('UserFactory', UserFactory);

  function UserFactory($http, $q) {
    var o = {};

    return o;
  }
})();
