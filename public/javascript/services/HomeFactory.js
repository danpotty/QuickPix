(function() {
    'use strict';
    angular.module('app')
        .factory('HomeFactory', HomeFactory);

    function HomeFactory($http, $q, $window) {
        var o = {};

        //------------------------------------------------------
        //------------------POST FUNCTIONS-------------------
        //------------------------------------------------------

        o.getAllPosts = function() {
            var q = $q.defer();
            $http.get("/api/v1/posts").then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.createPost = function(post) {
            var q = $q.defer();
            $http.post("/api/v1/posts", post, {
                headers: {
                    authorization: "Bearer " + $window.localStorage.getItem("token")
                }
            }).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.deletePost = function(id) {
            var q = $q.defer();
            $http.delete("/api/v1/posts/" + id).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.updatePost = function(newPost, oldPost) {
            var q = $q.defer();
            $http.put("/api/v1/posts/" + oldPost._id, newPost).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        //------------------------------------------------------
        //------------------COMMENT FUNCTIONS-------------------
        //------------------------------------------------------

        o.createComment = function(comment) {
            var q = $q.defer();
            $http.post('/api/v1/posts/')
        }

        //------------------------------------------------------
        //------------------RATING FUNCTIONS-------------------
        //------------------------------------------------------

        o.upVote = function(postId) {
            var q = $q.defer();
            $http.put("/api/v1/posts/upvote/" + postId, null, {
                headers: {
                    authorization: "Bearer " + $window.localStorage.getItem("token")
                }
            }).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.downVote = function(postId) {
            var q = $q.defer();
            $http.put("/api/v1/posts/downvote/" + postId, null, {
                headers: {
                    authorization: "Bearer " + $window.localStorage.getItem("token")
                }
            }).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        return o;
    }
})();
