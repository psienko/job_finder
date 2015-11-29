(function() {
  'use strict';

  angular
    .module('jobFinder')
    .controller('myAdsController', myAdsController);

  /** @ngInject */
  function myAdsController($log, myAdsService) {
    /*jshint validthis:true */
    var vm = this;

    vm.messageErr = '';
    vm.myAds = myAdsService.query({id: "1"});


  }
})();
