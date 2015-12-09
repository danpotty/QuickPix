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
                    locals: {
                        post: post
                    }

                })
                .then(function(newPost) {
                    HomeFactory.updatePost(newPost, post).then(function(res) {
                        vm.posts[vm.posts.indexOf(post)] = newPost;
                    });

                });
        }

        vm.deletePost = function(post) {
            vm.posts.splice(vm.posts.indexOf(post), 1);
            HomeFactory.deletePost(post._id);
        };
    };

    function ProfileDialogueController($scope, $mdDialog, post) {
        $scope.post = angular.copy(post);
        $scope.updateProf = function() {
            $mdDialog.hide($scope.post);
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.pic = function() {
            filepicker.setKey("AI7euAQRrqFuwZR6Jg1Zwz");
            filepicker.pick({
                mimetype: 'image/*',
                /* Images only */
                maxSize: 1024 * 1024 * 5,
                /* 5mb */
                imageMax: [1500, 1500],
                /* 1500x1500px */
                cropRatio: 1 / 1,
                /* Perfect squares */
                services: ['*'] /* All available third-parties */
            }, function(blob) {
                var filename = blob.filename;
                var url = blob.url;
                var id = blob.id;
                var isWriteable = blob.isWriteable;
                var mimetype = blob.mimetype;
                var size = blob.size;
                $scope.post.image = url;

                if (blob) {
                    $scope.$apply(function() {
                        $scope.preview = true;
                    });
                };
            });
        };
    };
})();
