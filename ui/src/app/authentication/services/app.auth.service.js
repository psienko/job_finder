(function() {
  'use strict';

  angular
    .module('jobFinder')
    .factory('appAuthService', appAuthService);

  /** @ngInject */
  function appAuthService($http, $q, localStorageService, ngAuthSettings, $log, authService) {

    var signInUri = ngAuthSettings.apiSignINUri;
    var signOutUri = ngAuthSettings.apiSignOUTUri;

    var authentication = {
      isAuth: false,
      email: "",
      userName: ""
    };

    return {
      login: login,
      logOut: logOut,
      fillAuthData: fillAuthData,
      authentication: authentication
    };

    function login(loginData) {

      var data = "email=" + loginData.email +
        "&password=" + loginData.password;

      var deferred = $q.defer();

      $http.post(signInUri, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        ignoreAuthModule: true,
        ignoreLoadingBar: true
      }).success(function(response, status, headers) {

        localStorageService.set('authorizationData', {
          accessToken: headers('Access-Token'),
          tokenType: headers('Token-Type'),
          client: headers('Client'),
          expiry: headers('Expiry'),
          uid: headers('Uid'),
          email: loginData.email,
          created: new Date().getTime(),
          userName: response.data.name + " " + response.data.lastname
        });

        authentication.isAuth = true;
        authentication.email = loginData.email;
        authentication.userName = response.data.name + " " + response.data.lastname;

        deferred.resolve(response);

      }).error(function(err, status) {
        $log.debug(err.errors + '\nHttpStatus: ' + status);
        localStorageService.remove('authorizationData');
        logOut();
        deferred.reject(err);
      });

      return deferred.promise;
    }

    function logOut() {

      var deferred = $q.defer();

      $http.delete(signOutUri).success(function(response) {
        localStorageService.remove('authorizationData');
        $log.debug(response);
        authentication.isAuth = false;
        authentication.email = "";
        authentication.userName = "";
        authService.loginCancelled();

      }).error(function(err, status) {
        $log.debug(err.errors + '\nHttpStatus: ' + status);
        localStorageService.remove('authorizationData');
        logOut();
        deferred.reject(err);
      });

      return deferred.promise;
    }

    function fillAuthData() {
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        var timeOut = new Date();
        var tmp = parseInt(authData.expiry) + authData.created;
        if (tmp < timeOut) {
          localStorageService.remove('authorizationData');
          return;
        }
        authentication.isAuth = true;
        authentication.email = authData.email;
        authentication.userName = authData.userName;
        authService.loginConfirmed();
      }
    }
  }
})();
