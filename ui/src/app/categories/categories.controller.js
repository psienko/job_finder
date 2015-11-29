(function() {
  'use strict';

  angular
    .module('jobFinder')
    .controller('CategoriesController', CategoriesController);

  /** @ngInject */
  function CategoriesController($log, categoriesService) {
    /*jshint validthis:true */
    var vm = this;

    vm.messageErr = '';
    vm.categories = categoriesService.categories.query();

    vm.categories.$promise.then(
      function (result) {vm.categories = result.categories;},
      function (error) {
        $log.error(error);
        vm.errorMessage = error.data.Message;
      });
  }
})();
