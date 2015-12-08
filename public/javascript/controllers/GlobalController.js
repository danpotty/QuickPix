(function() {
    'use strict';
    angular.module('app')
        .controller('GlobalController', GlobalController)
        .controller("DialogueController", DialogueController);


    function GlobalController(UserFactory, $state, $mdDialog, $scope) {
        var vm = this;
        vm.user = {};
        vm.status = UserFactory.status;

        vm.login = function() {
            UserFactory.login(vm.user).then(function(res) {
                $state.go('Home');
            });
        };

        vm.openRegisterModal = function(ev) {
            $mdDialog.show({
                    controller: DialogueController,
                    templateUrl: '/templates/partials/registerModal.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true

                })
                .then(function(user) {
                    UserFactory.register(user).then(function(res) {
                        $state.go('Home');
                    });

                });
        }


        vm.logout = UserFactory.removeToken;



        vm.pic = function() {
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

                UserFactory.sendpPic(blob, vm.status._id).then(function(res) {
                    console.log(res);
                    vm.image = res;
                    $state.go('Home');
                });
            });
        };
    };

    function DialogueController($scope, $mdDialog) {
        $scope.register = function() {
            $mdDialog.hide($scope.user);
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    };


})();
