(function() {
    'use strict';
    angular.module('app')
        .controller('ProfileController', ProfileController)
    .controller("ProfileDialogueController", ProfileDialogueController);

    function ProfileController(HomeFactory, UserFactory, $state, $mdDialog) {
        var vm = this;

        UserFactory.getProfilePosts().then(function(res) {
            vm.posts = res;
        });



        vm.openProfileModal = function(ev, post) {
            $mdDialog.show({
                    controller: ProfileDialogueController,
                    templateUrl: '/templates/partials/profileModal.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    locals : {post:post }

                })
                .then(function(newPost) {
                    HomeFactory.updatePost(newPost, post).then(function(res) {
                    	vm.posts[vm.posts.indexOf(post)] = newPost;
                    });

                });
        }
    };


    function ProfileDialogueController($scope, $mdDialog, post) {
        $scope.post = angular.copy(post);
        $scope.updateProf = function() {
            $mdDialog.hide($scope.post);
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    };
})();
