'use strict';

/**
 * @ngdoc function
 * @name gsfApp.controller:LoginCtrl
 * @description
 * # LoginCtrl : Controller for the login/signup view
 * Controller of the gsfApp
 */
angular.module('gsfApp.controllers', [])
	.controller('LoginCtrl', ['$scope', 'loginService', function ($scope, loginService) {
		$scope.userEmail;
		$scope.userPassword;
		$scope.loginFb = loginService.loginFb;
		$scope.loginGplus = loginService.loginGplus;
		$scope.loginTwitter = loginService.loginTwitter;
		$scope.signedUp = false;

		function loginEmail() {

		}
	}]);
