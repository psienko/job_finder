(function () {
    'use strict';

    angular
        .module('jobFinder')
        .factory('appAuthService', appAuthService);

    /** @ngInject */
    function appAuthService($http, $q, localStorageService, ngAuthSettings, $log, authService) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var appAuthServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: ""
        };

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName +
                "&password=" + loginData.password +
                "&client_id=" + ngAuthSettings.clientId;

            var deferred = $q.defer();

            $http.post(serviceBase + 'Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, ignoreAuthModule: true, ignoreLoadingBar: true }).success(function (response) {

                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token });

                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
                authService.loginConfirmed();

                deferred.resolve(response);

            }).error(function (err, status) {
                $log.debug(err.error_description + '\nHttpStatus: ' + status);
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";

            authService.loginCancelled();
        };

        var _fillAuthData = function () {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                authService.loginConfirmed();
            }
        };

        var _refreshToken = function () {
            var deferred = $q.defer();

            var authData = localStorageService.get('authorizationData');

            if (authData) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                localStorageService.remove('authorizationData');

                $http.post(serviceBase + 'Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, ignoreLoadingBar: true }).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.access_token, userName: authData.userName, refreshToken: response.refresh_token });
                    authService.loginConfirmed();
                    deferred.resolve(response);

                }).error(function (err, status) {
                    $log.debug(err.error_description + '\nHttpStatus: ' + status);
                    _logOut();
                    deferred.reject(err);
                });

            }

            return deferred.promise;
        };


        appAuthServiceFactory.login = _login;
        appAuthServiceFactory.logOut = _logOut;
        appAuthServiceFactory.fillAuthData = _fillAuthData;
        appAuthServiceFactory.authentication = _authentication;
        appAuthServiceFactory.refreshToken = _refreshToken;

        return appAuthServiceFactory;
    }
})();