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
        templateUrl: 'app/categories/categories.html',
        controller: 'CategoriesController',
        controllerAs: 'vm'
      })
      .state('Login', {
        url: '/login',
        templateUrl: 'app/authentication/login/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCTRL'
      })
      .state('MyAds', {
        url: '/myAdverts',
        templateUrl: 'app/myAdverts/myAdverts.html',
        controller: 'MyAdvertsController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
