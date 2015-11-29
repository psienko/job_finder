(function() {
  'use strict';

  angular
    .module('jobFinder')
    .controller('myAdsController', myAdsController);

  /** @ngInject */
  function myAdsController($log, myAdsService) {
    var vm = this;

    vm.messageErr = '';
    vm.myAds = myAdsService.advertisments.query({
      id: "1"
    });

    vm.myAds.$promise.then(
      function(result) {
        vm.myAds = result.advertisements;
      },
      function(error) {
        $log.error(error);
        vm.errorMessage = error.data.Message;
      });


  }
})();