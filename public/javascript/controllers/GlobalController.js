(function() {
  'use strict';
  angular.module('app')
    .controller('GlobalController', GlobalController);

  function GlobalController(UserFactory, $state) {
    var vm = this;

    vm.register = function() {
      UserFactory.register(vm.user).then(function(res) {
        $state.go('Home');
      });
    };

    vm.login = function() {
      UserFactory.login(vm.user).then(function(res) {
        $state.go('Home');
      });
    };

    vm.logout = UserFactory.removeToken;

  }
})();
