'use strict';

/**
 * @ngdoc service
 * @name gsfApp.loginService
 * @description
 * # loginService : Service for handling all login/signup scenarios
 * Service in the gsfApp.
 */
angular.module('gsfApp.services', [])
	.factory('loginService', ['$http', 'LOGIN_CONST', function ($http, LOGIN_CONST) {
		return {
			loginGplus: function () {
				gapi.auth.signIn({
					'clientid': LOGIN_CONST.GPLUS.APPID,
					'cookiepolicy': 'single_host_origin',
					'requestvisibleactions': 'http://schema.org/AddAction',
					'scope': 'https://www.googleapis.com/auth/plus.login',
					'callback': signinCallback
				});
			},

			loginFb: function () {
				FB.getLoginStatus(function (resp) {
					if (resp.status === 'connected') {
						FB.api('/me/permissions', function (response) {
							console.log(response);
						});
					} else {
						initiateLogin();
					}
				});
			},

			loginTwitter: function () {
				var oauth_params = '',
					baseSign = '',
					authHeader = 'OAuth ',
					oauth = {
						'consumer_key': 'VEpvE1m3YdPoF4inJ3y6vh1be',
						'consumer_secret': '7KTo1hxvOthDbDArLyT1bdyzX1GsG5UUu2F3pISS5G6b7PybMp',
						'oauth_access_token': '47856303-KfI2ng9FH6iLTLxJLbT40I7USraOWKnOYP5RXIJz4',
						'oauth_access_token_secret': 'XZ4nn2MEQIDShkr7gGzaLgw4U03KQn674LTqe6oUegzn8',
						'oauth_nonce': (new Date()).getTime()
					},
					params = {
						'oauth_callback': 'http://localhost:9000/twitter',
						'oauth_consumer_key': oauth.consumer_key,
						'oauth_nonce': oauth.oauth_nonce,
						'oauth_signature_method': 'HMAC-SHA1',
						'oauth_timestamp': parseInt(oauth.oauth_nonce / 1000),
						'oauth_token': oauth.oauth_access_token,
						'oauth_version': '1.0'
					},
					url_config = {
						method: 'POST',
						baseUrl: 'https://api.twitter.com/1.1/oauth/request_token'
					}

				baseSign = calcSign(params, url_config);

				params['oauth_signature'] = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(baseSign, oauth.consumer_secret + '&'));

				angular.forEach(params, function (value, key) {
					oauth_params = oauth_params + encodeURIComponent(key) + '=' + '\"' + encodeURIComponent(value) + '\", ';
				});

				oauth_params = oauth_params.slice(0, -2);

				$http({
						url: url_config.baseUrl,
						method: url_config.method,
						headers: {
							Authorization: authHeader + oauth_params
						}
					})
					.success(function (data) {
						console.log(data);
					})
					.error(function (data) {
						console.log(authHeader + oauth_params);
					})
			}
		}

		function initiateLogin() {
			FB.login(function (response) {
				if (response.status === 'connected') {
					console.log(response);
				} else if (response.status === 'not_authorized') {
					console.log(response);
				} else {
					console.log(response);
				}
			}, {
				scope: LOGIN_CONST.FB.APP_PERMS
			});
		}

		function signinCallback(authResult) {
			if (authResult['access_token']) {
				gapi.client.request({
					'path': '/plus/v1/people/me',
					'method': 'GET',
					'callback': userInfoCallback
				});
			} else {
				console.log(authResult);
			}
		}

		function userInfoCallback(userInfo) {
			console.log(userInfo);
		}

		function calcSign(params, url_config) {
			var sign_params = ''
			angular.forEach(params, function (value, key) {
				sign_params = sign_params + encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
			});

			return url_config.method + '&' + encodeURIComponent(url_config.baseUrl) + '&' + encodeURIComponent(sign_params.slice(0, -1));
		}
	}])
	.run(['$window', 'LOGIN_CONST', function ($window, LOGIN_CONST) {
		(function (d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.async = true;
			js.id = id;
			js.src = LOGIN_CONST.FB.JSSDK;
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		(function (d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.async = true;
			js.id = id;
			js.src = LOGIN_CONST.GPLUS.JSSDK;
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'google-jssdk'));

		$window.fbAsyncInit = function () {
			FB.init({
				appId: LOGIN_CONST.FB.APPID,
				cookie: true,
				xfbml: true,
				version: 'v2.3'
			});
		}
	}]);
