(function () {
    'use strict';

    angular
        .module('jobFinder')
        .directive('myAdsList', myAdsList);

    /** @ngInject */
    function myAdsList() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/myAds/myAdsList.html',
            controller: myAdsListController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function myAdsListController($log, toastr) {



        }

    }
})();