'use strict';

/**
 * @ngdoc service
 * @name gsfApp.gsfConst
 * @description
 * # gsfConst
 * Constant in the gsfApp.
 */
angular.module('gsfApp')
	.constant('LOGIN_CONST', {
		'FB': {
			'JSSDK': '//connect.facebook.net/en_US/sdk.js',
			'APPID': '1568613366739232',
			'APP_PERMS': 'email, public_profile, user_friends'
		},
		'GPLUS': {
			'JSSDK': 'https://apis.google.com/js/client:platform.js',
			'APPID': '736414588051-q1a7dt3imhkblegrbvln0nkdt5ss16eg.apps.googleusercontent.com'
		},
		'TWTR': {

		}
	});
