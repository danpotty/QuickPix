(function() {
  'use strict';
  angular.module('app')
  .controller('PostDetailsController', PostDetailsController);

  function PostDetailsController($state, $stateParams, CommentFactory, UserFactory) {
    var vm = this;

    if(!$stateParams.id) $state.go('Home');
    CommentFactory.getPostById($stateParams.id).then(function(res){
      vm.post = res;
    });

    vm.createComment = function(){
      CommentFactory.createComment(vm.post._id, vm.comment).then(function(res){
        res.user = {};
        res.user.username = UserFactory.status.username;
        vm.post.comments.push(res);
      });
    };
  };
})();
