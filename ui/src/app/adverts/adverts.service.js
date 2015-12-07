(function () {
    'use strict';

    angular
        .module('jobFinder')
        .factory('advertsService', advertsService);

    /** @ngInject */
    function advertsService($resource, apiAdvertisments) {
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
