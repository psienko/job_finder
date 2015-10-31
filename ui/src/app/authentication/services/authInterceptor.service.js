(function () {
    'use strict';

    angular
        .module('jobFinder')
        .factory('authInterceptorService', authInterceptorService);

    /** @ngInject */
    function authInterceptorService($q, $injector, $location, $rootScope, $log, localStorageService, httpBuffer) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        };

        var _responseError = function (rejection) {

            if (rejection.status === 401) {
                httpBuffer.append(rejection.config, $q.defer());
            }

            return $q.reject(rejection);
        };

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }
})();