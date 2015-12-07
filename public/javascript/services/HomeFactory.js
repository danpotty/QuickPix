(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	function HomeFactory($http, $q, $window) {
		var o = {};

		o.getAllPosts = function(){
			var q = $q.defer();
			$http.get("/api/v1/posts").then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.createPost = function(post){
			var q = $q.defer();
			$http.post("/api/v1/posts", post, {
				headers: { authorization : "Bearer " + $window.localStorage.getItem("token")}
			}).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};


		return o;
	}
})();
