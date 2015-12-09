(function() {
    'use strict';
    angular.module('app')
        .controller('PostDetailsController', PostDetailsController);

    function PostDetailsController($state, $stateParams, CommentFactory, UserFactory) {
        var vm = this;

        if (!$stateParams.id) $state.go('Home');
        CommentFactory.getPostById($stateParams.id).then(function(res) {
            vm.post = res;
        });

        vm.createComment = function() {
            CommentFactory.createComment(vm.post._id, vm.comment).then(function(res) {
                vm.comment.user = UserFactory.status._id;
                vm.post.comments.push(vm.comment);
                vm.comment = {};
            });
        };

        vm.startEditC = function(comment) {
            vm.isEditingC = true;
            vm.selectedComment = comment;
            vm.newCommentObj = angular.copy(comment);
        };

        vm.updateComment = function(comment) {
            CommentFactory.updateComment(vm.newCommentObj, vm.selectedComment).then(function(res) {
                vm.post.comments[vm.post.comments.indexOf(vm.selectedComment)] = vm.newCommentObj;
                vm.isEditingC = false;
                vm.selectedComment = null;
                vm.editComment = null;
            });
        };

        vm.deleteComment = function(comment) {
            vm.post.comments.splice(vm.post.comments.indexOf(comment), 1);
            CommentFactory.deleteComment(comment._id);
        };
    };
})();
