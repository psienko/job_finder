(function () {
    'use strict';

    angular
        .module('jobFinder')
        .directive('myAdsItem', myAdsItem);

    /** @ngInject */
    function myAdsItem() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/myAds/myAdsItem.html',
            controller: myAdsItemController,
            controllerAs: 'vm',
            scope: {},
            bindToController: {
                myAd: '='
            }
        };

        return directive;

        /** @ngInject */
        function myAdsItemController($log, toastr) {
            var vm = this;



        }

    }
})();
