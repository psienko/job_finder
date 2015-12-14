(function() {
  'use strict';

  angular
    .module('jobFinder')
    .controller('MyAdvertsController', MyAdvertsController);

  /** @ngInject */
  function MyAdvertsController($log, advertsService, categoriesService, localStorageService) {
    var vm = this;

    vm.categories = categoriesService.categories.query();

    vm.messageErr = '';
    vm.myAdvertsList = [];
    vm.authentication = localStorageService.get('authorizationData');

    vm.categories.$promise.then(
      function(result) {
        vm.categories = result.categories;
        result.categories.forEach(function(category) {
          vm.myAdverts = advertsService.advertisments.query({
            id: category.id
          });
          vm.myAdverts.$promise.then(
            function(result) {
              if (result.advertisements.length > 0) {
                vm.myAdvertsList = vm.myAdvertsList.concat({
                  adverts: result.advertisements,
                  category: category
                });
              }
            },
            function(error) {
              $log.error(error);
              vm.errorMessage = error.data.Message;
            });
        });
      },
      function(error) {
        $log.error(error);
        vm.errorMessage = error.data.Message;
      });





  }
})();
