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
			vm.posts.splice(vm.posts.indexOf(post), 1);
			HomeFactory.deletePost(post._id);
		};

	};
})();
