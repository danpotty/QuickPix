(function() {
    'use strict';
    angular.module('app')
        .controller('PostDetailsController', PostDetailsController)
        .controller("CommentsDialogueController", CommentsDialogueController)

    function PostDetailsController($state, $stateParams, CommentFactory, UserFactory, $mdDialog) {
        var vm = this;

        if (!$stateParams.id) $state.go('Home');
        CommentFactory.getPostById($stateParams.id).then(function(res) {
            vm.post = res;
        });

        vm.createComment = function() {
            CommentFactory.createComment(vm.post._id, vm.comment).then(function(res) {
                res.user = UserFactory.status._id;
                vm.post.comments.push(res);
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
                vm.comment.message = null;
                vm.selectedComment = null;
                vm.isEditingC = false;
            });
        };

        vm.deleteComment = function(comment) {
            if (vm.isEditingC) {
                vm.newCommentObj.message = null;
                vm.isEditingC = false;
            }
            vm.post.comments.splice(vm.post.comments.indexOf(comment), 1);
            CommentFactory.deleteComment(comment._id);
        };

        vm.openCommentModal = function(ev, comment) {
            $mdDialog.show({
                    controller: CommentsDialogueController,
                    templateUrl: '/templates/partials/commentsModal.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    locals: {
                        comment: comment
                    }
                })
                .then(function(newcom) {
                    CommentFactory.updateComment(newcom, comment).then(function(res) {
                        vm.post.comments[vm.post.comments.indexOf(comment)] = newcom;
                    });

                });
        }
    }

    function CommentsDialogueController($scope, $mdDialog, comment) {
        $scope.comment = angular.copy(comment);
        $scope.updateComm = function() {
            $mdDialog.hide($scope.comment);
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    };
})();
