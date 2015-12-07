(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	function HomeFactory($http, $q, $window) {
		var o = {};

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
