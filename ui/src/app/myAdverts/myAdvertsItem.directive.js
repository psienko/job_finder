(function() {
  'use strict';

  angular
    .module('jobFinder')
    .directive('myAdvertsItem', myAdvertsItem);

  /** @ngInject */
  function myAdvertsItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/myAdverts/myAdvertsItem.html',
      controller: myAdvertsItemController,
      controllerAs: 'vm',
      scope: {},
      bindToController: {
        myAdvert: "="
      }
    };

    return directive;

    /** @ngInject */
    function myAdvertsItemController(advertsService, $log) {
      var vm = this;

    }
  }
})();
