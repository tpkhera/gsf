'use strict';

/**
 * @ngdoc service
 * @name gsfApp.util
 * @description
 * # util
 * Service in the gsfApp.
 */
angular.module('gsfApp.services')
	.factory('util', ['$mdToast', '$mdDialog', function ($mdToast, $mdDialog) {
		return {
			toast: function (err, message) {
				$mdToast.show(
					$mdToast.simple()
					.content(message)
					.position('top right')
					.hideDelay(3000)
				);
			},
			login: function () {
				$mdDialog.show({
					clickOutsideToClose: true,
					templateUrl: 'views/login.tpl.html',
					controller: 'LoginCtrl'
				})
			}
		}
	}]);
