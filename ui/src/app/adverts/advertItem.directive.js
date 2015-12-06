(function() {
  'use strict';

  angular
    .module('jobFinder')
    .directive('advertItem', advertItem);

  /** @ngInject */
  function advertItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/adverts/advertItem.html',
      controller: advertItemController,
      controllerAs: 'vm',
      scope: {},
      bindToController: {
        advert: '='
      }
    };

    return directive;

    /** @ngInject */
    function advertItemController() {
      var vm = this;



    }

  }
})();
