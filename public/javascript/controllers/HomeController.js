(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController)
    .controller("HomeDialogueController", HomeDialogueController)

  function HomeController(UserFactory, HomeFactory, $state, $stateParams, $scope, $mdDialog, $mdToast) {
    var vm = this;
    vm.post = {};
    vm.preview = false;

    HomeFactory.getAllPosts().then(function(res) {
      vm.posts = res;
    });

    vm.createPost = function() {
      HomeFactory.createPost(vm.post).then(function(res) {
        res.createdBy = {};
        res.createdBy._id = UserFactory.status._id;
        res.createdBy.username = UserFactory.status.username;
        vm.posts.push(res);
        vm.post = {};
        vm.preview = false;
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

    // vm.saveToast = function() {
    //   $mdToast.show(
    //     $mdToast.simple()
    //     .textContent('Rating Saved!')
    //     .position(top right)
    //     .hideDelay(2500)
    //   );
    // };

    vm.clearToast = function() {
        $mdToast.show({
          position: "top right",
          textContent: "Rating Cleared!",
          hideDelay: 2500
        });
    }

    $scope.saveToast = function() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Rating Saved!')
        .position('top right')
        .hideDelay(2500)
      );
    };

    // vm.clearToast = function() {
    //   $mdToast.showSimple('Rating Cleared!');
    // };

    vm.repeatToast = function() {
      $mdToast.showSimple('You already rated!');
    };

    vm.upVote = function(post) {
      for (var i = 0; i < post.upVoters.length; i++) {
        if (post.upVoters[i] == UserFactory.status._id) {
          $mdToast.show(
      $mdToast.simple()
      .content('Error getting animals')
      .position('top right')
      .hideDelay(2250)
    );
          vm.repeatToast();
          console.log('already voted! (controller 55)');
          return
        } else if ((i + 1) >= post.upVoters.length) {
          for (var u = 0; u < post.downVoters.length; u++){
            if(post.downVoters[u] == UserFactory.status._id){
              post.downVoters.splice(u, 1);
              post.rating++;
              vm.clearToast();
              console.log('votes cleared! (controller 64)');
              HomeFactory.upVote(post._id).then(function(res) {
              });
              return
            }
            else if ((u + 1) >= post.downVoters.length){
              HomeFactory.upVote(post._id).then(function(res) {
                post.upVoters.push(UserFactory.status._id);
                post.rating++;
                saveToast();
                console.log('vote saved!');
                return
              });
            }
          }
        }
      }
    };

    vm.downVote = function(post) {
      for (var i = 0; i < post.downVoters.length; i++) {
        if (post.downVoters[i] == UserFactory.status._id) {
          vm.repeatToast();
          console.log('already voted!(controller 76)');
          return
        } else if ((i + 1) >= post.downVoters.length) {
          HomeFactory.downVote(post._id).then(function(res) {
            for (var u = 0; u < post.upVoters.length; u++){
              if(post.upVoters[u] == UserFactory.status._id){
                post.upVoters.splice(u, 1);
                post.rating--;
                vm.clearToast();
                console.log('votes cleared! (controller 90)');
                return
              }
              else if ((u + 1) >= post.upVoters.length){
                post.downVoters.push(UserFactory.status._id);
                post.rating--;
                saveToast();
                console.log('vote saved!');
                return
              }
            }
          });
        }
      }
    };

    //------------------------------------------------------
    //------------------FILE PICKER FUNCTIONS-------------------
    //------------------------------------------------------


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
        vm.post.image = url;
        vm.post.message = "";

        if (blob) {
          $scope.$apply(function() {
            vm.preview = true;
          });
          console.log(vm.preview);
        };
      });
    };

    vm.openHomeModal = function(ev, post) {
      $mdDialog.show({
          controller: HomeDialogueController,
          templateUrl: '/templates/partials/HomeModal.tmpl.html',
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
    };

  };

  //------------------------------------------------------
  //------------------EDIT MODAL FUNCTIONS-------------------
  //------------------------------------------------------

  function HomeDialogueController($scope, $mdDialog, post) {
    $scope.post = angular.copy(post);
    $scope.updateProf = function() {
      $mdDialog.hide($scope.post);
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };


  };
})();
