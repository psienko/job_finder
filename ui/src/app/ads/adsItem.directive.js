(function() {
  'use strict';

  angular
    .module('jobFinder')
    .directive('adsItem', adsItem);

  /** @ngInject */
  function adsItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/ads/adsItem.html',
      controller: adsItemController,
      controllerAs: 'vm',
      scope: {},
      bindToController: {
        ad: '='
      }
    };

    return directive;

    /** @ngInject */
    function adsItemController() {
      var vm = this;



    }

  }
})();
