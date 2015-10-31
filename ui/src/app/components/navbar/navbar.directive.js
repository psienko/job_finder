(function () {
  'use strict';

  angular
    .module('jobFinder')
    .directive('jobFinderNavbar', jobFinderNavbar);

  /** @ngInject */
  function jobFinderNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $scope, appAuthService, $location, $log, httpBuffer, $rootScope, cfpLoadingBar, localStorageService) {

      $scope.logOut = function () {
        appAuthService.logOut();
        $location.path('/home');
      };

      $rootScope.$on('event:auth-loginRequired', function () {
        var authData = localStorageService.get('authorizationData');

        if (authData) {
          appAuthService.refreshToken().then(function (response) {
            $log.debug('Refresh Token:\n');
            $log.debug(response);
            cfpLoadingBar.complete();
          }, function (reason) {
            $log.debug('Reason:\n');
            $log.debug(reason);
            appAuthService.logOut();
            cfpLoadingBar.complete();
            $location.path('/login');
          });
        }
        else {
          appAuthService.logOut();
          cfpLoadingBar.complete();
          $location.path('/login');
        }
      });

      $scope.authentication = appAuthService.authentication;
    }
  }

})();
