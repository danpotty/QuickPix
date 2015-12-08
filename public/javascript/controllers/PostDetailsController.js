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
        vm.comment = "";
      });
    };

    vm.startEdit = function(comment){
      vm.isEditingC = true;
      vm.selectedComment = comment;
      vm.newComment = angular.copy(comment.message);
    };

    vm.updateComment = function(){
      CommentFactory.updateComment(vm.newComment, vm.selectedComment).then(function(res) {
        vm.comments[vm.comments.indexOf(vm.selectedComment)] = vm.editComment;
        console.log(vm.editComment);
        vm.isEditingC = false;
        vm.selectedComment = null;
        vm.editComment = null;
      });
    };

  };
})();
