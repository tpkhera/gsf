'use strict';

/**
 * @ngdoc directive
 * @name gsfApp.directive:navbar
 * @description
 * # navbar
 */
angular.module('gsfApp')
	.directive('navbar', ['util', function (util) {
		return {
			templateUrl: 'views/partials/navbar.html',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				scope.openLogin = function () {
					util.login;
				}
			}
		};
	}]);
