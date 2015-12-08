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


        o.upVote = function(id) {
            var q = $q.defer();
            $http.put("/api/v1/posts/upvote/" + id).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        o.downVote = function(id) {
            var q = $q.defer();
            $http.put("/api/v1/posts/downvote/" + id).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };

        //------------------------------------------------------
        //------------------PHOTO UPLOAD FUNCTIONS-------------------
        //------------------------------------------------------

    //     o.sendpPic = function(pic, id) {
    //         var q = $q.defer();
    //         $http.put('/api/user/' + id + '/pic', pic).then(function(res) {
    //             console.log(res.data + "res.data");
    //             q.resolve(res.data);
    //         });
    //         return q.promise;
    //     }

        return o;
    }
})();
