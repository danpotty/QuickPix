(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(UserFactory, HomeFactory, $state, $stateParams) {
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


		//------------------------------------------------------
		//------------------COMMENT FUNCTIONS-------------------
		//------------------------------------------------------

		vm.createComment = function(){
			HomeFactory.createComment(vm.comment).then(function(res){
				res.createdBy = {};
				res.createdBy._id = UserFactory.status._id;
				res.createdBy.username = UserFactory.status.username;
				vm.comment = "";

		vm.startEdit = function(post){
			vm.isEditing = true;
			vm.selectedPost = post;
			vm.editPost = angular.copy(post);
		};

		vm.updatePost = function(){
			HomeFactory.updatePost(vm.editPost, vm.selectedPost).then(function(res){
				vm.posts[vm.posts.indexOf(vm.selectedPost)] = vm.editPost;
				vm.isEditing = false;
				vm.selectedPost = null;
				vm.editPost = null;
			});
		};

	};
})();
