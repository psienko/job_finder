(function () {
    'use strict';

    angular
        .module('jobFinder')
        .factory('myAdsService', myAdsService);

    /** @ngInject */
    function myAdsService($resource, apiAdvertisments) {
        return $resource(apiAdvertisments.advertisments);
    }

})();
