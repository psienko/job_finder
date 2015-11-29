(function () {
    'use strict';

    angular
        .module('jobFinder')
        .factory('adsService', adsService);

    /** @ngInject */
    function adsService($resource, apiAdvertisments) {
        return {
          advertisments: $resource(apiAdvertisments.advertisments, null, {
            query: {
              method: 'GET',
              isArray: false
            }
          })
        };
    }

})();
