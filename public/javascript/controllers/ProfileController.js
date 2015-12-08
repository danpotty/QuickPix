(function() {
  'use strict';
  angular.module('app')
  .controller('ProfileController', ProfileController);

  function ProfileController(HomeFactory, UserFactory, $state) {
    var vm = this;

        UserFactory.getProfilePosts().then(function(res) {
            vm.posts = res;
        });
  }
})();
