'use strict';

/**
 * @ngdoc overview
 * @name newAppApp
 * @description
 * # newAppApp
 *
 * Main module of the application.
 */
angular
	.module('gsfApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngTouch',
    'ngMaterial',
//    'ngFacebook',
		'angular-velocity',
		'gsfApp.services',
		'gsfApp.controllers'
  ])
	.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$mdThemingProvider', 'LOGIN_CONST', function ($locationProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, LOGIN_CONST) {

		$locationProvider.html5Mode(true);

		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'views/home.tpl.html',
				controller: 'LoginCtrl'
			})
			.state('home.login', {
				url: '/login',
				templateUrl: 'views/login.tpl.html',
				controller: 'LoginCtrl'
			});

		$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('green')
			.warnPalette('red')
			.backgroundPalette('grey');
	}]);
