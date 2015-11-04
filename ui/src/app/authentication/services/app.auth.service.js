(function () {
    'use strict';

    angular
        .module('jobFinder')
        .factory('appAuthService', appAuthService);

    /** @ngInject */
    function appAuthService($http, $q, localStorageService, ngAuthSettings, $log, authService) {

        var signInUri = ngAuthSettings.apiSignINUri;
        var signOutUri = ngAuthSettings.apiSignOUTUri;

        var appAuthServiceFactory = {};

        var _authentication = {
            isAuth: false,
            email: ""
        };

        var _login = function (loginData) {

            var data = "email=" + loginData.email +
                "&password=" + loginData.password;

            var deferred = $q.defer();

            $http.post(signInUri, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, ignoreAuthModule: true, ignoreLoadingBar: true }).success(function (response, status, headers) {

                localStorageService.set('authorizationData',
                    {
                        accessToken: headers('Access-Token'),
                        tokenType: headers('Token-Type'),
                        client: headers('Client'),
                        expiry: headers('Expiry'),
                        uid: headers('Uid'),
                        email: loginData.email
                    });
                    
                _authentication.isAuth = true;
                _authentication.email = loginData.email;
                authService.loginConfirmed();

                deferred.resolve(response);

            }).error(function (err, status) {
                $log.debug(err.errors + '\nHttpStatus: ' + status);
                localStorageService.remove('authorizationData');
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {

            var deferred = $q.defer();

            $http.delete(signOutUri).success(function (response) {
                localStorageService.remove('authorizationData');
                _authentication.isAuth = false;
                _authentication.email = "";
                authService.loginCancelled();

            }).error(function (err, status) {
                $log.debug(err.errors + '\nHttpStatus: ' + status);
                localStorageService.remove('authorizationData');
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;
        };

        var _fillAuthData = function () {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.email = authData.email;
                authService.loginConfirmed();
            }
        };

        appAuthServiceFactory.login = _login;
        appAuthServiceFactory.logOut = _logOut;
        appAuthServiceFactory.fillAuthData = _fillAuthData;
        appAuthServiceFactory.authentication = _authentication;

        return appAuthServiceFactory;
    }
})();