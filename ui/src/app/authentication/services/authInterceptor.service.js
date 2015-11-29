(function () {
    'use strict';

    angular
        .module('jobFinder')
        .factory('authInterceptorService', authInterceptorService);

    /** @ngInject */
    function authInterceptorService($q, $injector, $location, $rootScope, $log, localStorageService) {

        return {
            request: request,
            responseError: responseError,
            response: response
        };


        function request(config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers['Access-Token'] = authData.accessToken;
                config.headers['Token-Type'] = authData.tokenType;
                config.headers['Client'] = authData.client;
                config.headers['Expiry'] = authData.expiry;
                config.headers['Uid'] = authData.uid;
            }

            return config;
        }

        function responseError(rejection) {

            if (rejection.status === 401 || rejection.status === 403) {
                localStorageService.remove('authorizationData');
                $location.path('/login');
            }

            return $q.reject(rejection);
        }

        function response(response) {
            if (response.status === 200) {
                var authData = localStorageService.get('authorizationData');

                var accessToken = response.headers('Access-Token');
                var tokenType = response.headers('Token-Type');
                var client = response.headers('Client');
                var expiry = response.headers('Expiry');
                var uid = response.headers('Uid');

                if (authData && accessToken && tokenType && client && expiry && uid) {
                    localStorageService.set('authorizationData',
                        {
                            accessToken: accessToken,
                            tokenType: tokenType,
                            client: client,
                            expiry: expiry,
                            uid: uid,
                            email: uid
                        });
                }
            }
            return response;
        }
    }
})();
