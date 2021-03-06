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
    function NavbarController($scope, appAuthService, $location) {

      $scope.logOut = function () {
        appAuthService.logOut();
        $location.path('/home');
      };

      $scope.authentication = appAuthService.authentication;
    }
  }

})();
