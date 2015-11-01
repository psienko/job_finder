(function () {
    'use strict';

    angular
        .module('jobFinder')
        .factory('appAuthService', appAuthService);

    /** @ngInject */
    function appAuthService($http, $q, localStorageService, ngAuthSettings, $log, authService) {

        var serviceBase = ngAuthSettings.apiSignINUri;
        var appAuthServiceFactory = {};

        var _authentication = {
            isAuth: false,
            email: ""
        };

        var _login = function (loginData) {

            var data = "email=" + loginData.email +
                "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post(serviceBase, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, ignoreAuthModule: true, ignoreLoadingBar: true }).success(function (response) {

                //localStorageService.set('authorizationData', { token: response.access_token, email: loginData.email, refreshToken: response.refresh_token });
                localStorageService.set('authorizationData', { token: response.access_token, email: loginData.email, refreshToken: response.refresh_token });

                _authentication.isAuth = true;
                _authentication.email = loginData.email;
                authService.loginConfirmed();

                deferred.resolve(response);

            }).error(function (err, status) {
                $log.debug(err.errors + '\nHttpStatus: ' + status);
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.email = "";

            authService.loginCancelled();
        };

        var _fillAuthData = function () {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.email = authData.email;
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

                    localStorageService.set('authorizationData', { token: response.access_token, email: authData.email, refreshToken: response.refresh_token });
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