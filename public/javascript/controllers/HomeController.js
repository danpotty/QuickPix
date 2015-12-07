(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(UserFactory, HomeFactory, $state) {
		var vm = this;
		vm.posts = [];

		vm.createPost = function(){
			HomeFactory.createPost(vm.post).then(function(res){
				res.createdBy = {};
				res.createdBy._id = UserFactory.status._id;
				res.createdBy.username = UserFactory.status.username;
				vm.posts.push(res);
				vm.post = "";
			});
		};
	};
})();
