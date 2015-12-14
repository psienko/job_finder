(function() {
  'use strict';

  angular
    .module('jobFinder')
    .directive('advertsList', advertsList);

  /** @ngInject */
  function advertsList() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/adverts/advertsList.html',
      controller: advertsListController,
      controllerAs: 'vm',
      scope: {},
      bindToController: {
        categoryId: "@"
      }
    };

    return directive;

    /** @ngInject */
    function advertsListController(advertsService, $log) {
      var vm = this;

      vm.errorMessage = '';

      vm.adverts = advertsService.advertisments.query({
        id: vm.categoryId
      });

      vm.adverts.$promise.then(
        function(result) {
          vm.adverts = result.advertisements;
          if (vm.adverts.length === 0)
            vm.errorMessage = "Brak Ogłoszeń";
        },
        function(error) {
          $log.error(error);
          vm.errorMessage = error.data.Message;
        });


    }
  }
})();
