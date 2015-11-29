(function() {
  'use strict';

  angular
    .module('jobFinder')
    .factory('myAdsService', myAdsService);

  /** @ngInject */
  function myAdsService($resource, apiAdvertisments) {
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
