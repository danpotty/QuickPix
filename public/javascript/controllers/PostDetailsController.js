(function() {
  'use strict';
  angular.module('app')
  .controller('PostDetailsController', PostDetailsController);

  function PostDetailsController($state, $stateParams, CommentFactory) {
    var vm = this;

    if(!$stateParams.id) $state.go('Home');
    HomeFactory.getPostById($stateParams.id).then(function(res){
      vm.post = res;
    });


  }
})();
