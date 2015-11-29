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
        templateUrl: 'app/ads/ads.html',
        controller: 'AdsController',
        controllerAs: 'vm'
      })
      .state('Login', {
        url: '/login',
        templateUrl: 'app/authentication/login/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCTRL'
      })
      .state('MyAds', {
        url: '/myAds',
        templateUrl: 'app/myAds/myAds.html',
        controller: 'myAdsController',
        controllerAs: 'vm'
      })
      .state('Categories', {
        url: '/categories',
        templateUrl: 'app/categories/categories.html',
        controller: 'CategoriesController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
