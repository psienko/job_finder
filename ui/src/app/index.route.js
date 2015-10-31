(function () {
  'use strict';

  angular
    .module('jobFinder')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('Login', {
        url: '/login',
        templateUrl: 'app/authentication/login/login.html',
        controller: 'loginController',
        controllerAs: 'loginCTRL'
      });


    $urlRouterProvider.otherwise('/');
  }

})();
