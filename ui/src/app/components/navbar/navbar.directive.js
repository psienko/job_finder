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

      $scope.authentication = appAuthService.authentication;
    }
  }

})();
