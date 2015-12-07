(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: '/templates/home.html',
      controller: 'HomeController as vm'
		}).state('Login', {
			url:'/login',
			templateUrl: '/templates/login.html'
		}).state('Register', {
			url: '/register',
			templateUrl: '/templates/register.html'
		}).state('Profile', {
			url: '/profile',
			templateUrl: '/templates/profile.html',
			controller: 'ProfileController as vm'
		}).state('PostDetails',{
			url: '/post/:id',
			templateUrl: '/templates/post_details.html',
			// controller: ' as vm'
		});
		$urlRouterProvider.otherwise('/');

	}
})();
