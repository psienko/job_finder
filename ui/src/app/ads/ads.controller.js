(function() {
  'use strict';

  angular
    .module('jobFinder')
    .controller('AdsController', AdsController);

  /** @ngInject */
  function AdsController($log, adsService) {
    var vm = this;

    vm.messageErr = '';
    vm.ads = adsService.advertisments.query({
      id: "1"
    });

    vm.ads.$promise.then(
      function(result) {
        vm.ads = result.advertisements;
      },
      function(error) {
        $log.error(error);
        vm.errorMessage = error.data.Message;
      });


  }
})();
