(function() {
    'use strict';
    angular.module('app')
        .factory('HomeFactory', HomeFactory);

    function HomeFactory($http, $q, $window) {
        var o = {};

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
            var obj = newPost;
            var q = $q.defer();
            $http.put("/api/v1/posts/" + oldPost._id, obj).then(function(res) {
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


        o.upVote = function(postId, voterId) {
            var q = $q.defer();
            $http.put("/api/v1/posts/upvote/" + postId).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.downVote = function(postId, voterId) {
            var q = $q.defer();
            $http.put("/api/v1/posts/downvote/" + postId).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        return o;
    }
})();
