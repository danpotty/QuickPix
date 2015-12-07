(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(UserFactory, HomeFactory, $state) {
		var vm = this;

			HomeFactory.getAllPosts().then(function(res) {
				vm.posts = res;
			});

		vm.createPost = function(){
			HomeFactory.createPost(vm.post).then(function(res){
				res.createdBy = {};
				res.createdBy._id = UserFactory.status._id;
				res.createdBy.username = UserFactory.status.username;
				vm.post = "";
			});
		};

		vm.deletePost = function(post){
			HomeFactory.deletePost(post).then(function(res){
				$state.go('Home');
			});
		};

	};
})();
