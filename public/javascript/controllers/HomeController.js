(function() {
    'use strict';
    angular.module('app')
        .controller('HomeController', HomeController);

    function HomeController(UserFactory, HomeFactory, $state, $stateParams, $scope) {
        var vm = this;


        HomeFactory.getAllPosts().then(function(res) {
            vm.posts = res;
        });

        vm.createPost = function() {
            HomeFactory.createPost(vm.post).then(function(res) {
                res.createdBy = {};
                res.createdBy._id = UserFactory.status._id;
                res.createdBy.username = UserFactory.status.username;
                vm.posts.push(res);
                vm.post = "";
            });
        };

        vm.deletePost = function(post) {
            vm.posts.splice(vm.posts.indexOf(post), 1);
            HomeFactory.deletePost(post._id);
        };


        vm.startEdit = function(post) {
            vm.isEditing = true;
            vm.selectedPost = post;
            vm.editPost = angular.copy(post);
        };

        vm.updatePost = function() {
            HomeFactory.updatePost(vm.editPost, vm.selectedPost).then(function(res) {
                vm.posts[vm.posts.indexOf(vm.selectedPost)] = vm.editPost;
                vm.isEditing = false;
                vm.selectedPost = null;
                vm.editPost = null;
            });
        };

        //------------------------------------------------------
        //------------------RATING FUNCTIONS-------------------
        //------------------------------------------------------

        vm.upVote = function(post) {
          for(var i = 0; i < post.upVoters.length; i++){
            if(post.upVoters[i] == UserFactory.status._id){
              console.log('already voted!');
              $scope.openToast = function($event) {
                $mdToast.show($mdToast.simple().textContent('Hello!'));
              }
            }
            else if((i+1) >= post.upVoters.length){
              for(var i = 0; i < post.downVoters.length; i++){
                if(post.downVoters[i] == UserFactory.status._id){
                  post.rating++;
                }
              }
              HomeFactory.upVote(post._id).then(function(res) {
                post.rating++;
              });
            }
          }
        };

        vm.downVote = function(post) {
          for(var i = 0; i < post.downVoters.length; i++){
            if(post.downVoters[i] == UserFactory.status._id){
              console.log('already voted!');
            }
            else if((i+1) >= post.downVoters.length){
              for(var i = 0; i < post.upVoters.length; i++){
                if(post.upVoters[i] == UserFactory.status._id){
                  post.rating--;
                }
              }
              HomeFactory.downVote(post._id).then(function(res) {
                post.rating--;
              });
            }
          }
        };
    };
})();
