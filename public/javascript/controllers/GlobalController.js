(function() {
    'use strict';
    angular.module('app')
        .controller('GlobalController', GlobalController)
        .controller("DialogueController", DialogueController)
        .controller("LoginDialogueController", LoginDialogueController)


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

        vm.openLoginModal = function(ev) {
            $mdDialog.show({
                    controller: LoginDialogueController,
                    templateUrl: '/templates/partials/loginModal.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true

                })
                .then(function(user) {
                    UserFactory.login(user).then(function(res) {
                        $state.go('Home');
                    });

                });
        }



        vm.logout = UserFactory.removeToken;

    };

    function DialogueController($scope, $mdDialog) {
        $scope.register = function() {
            $mdDialog.hide($scope.user);
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    };

    function LoginDialogueController($scope, $mdDialog) {
        $scope.login = function() {
            $mdDialog.hide($scope.user);
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    };


})();
