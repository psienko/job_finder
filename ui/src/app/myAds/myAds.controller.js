(function () {
    'use strict';

    angular
        .module('jobFinder')
        .controller('myAdsController', myAdsController);

    /** @ngInject */
    function myAdsController(ngAuthSettings, $log, toastr) {
        var vm = this;
        
        vm.messageErr = '';
        
    }
})();