(function() {
  'use strict';

  angular
    .module('jobFinder')
    .factory('categoriesService', categoriesService);

  /** @ngInject */
  function categoriesService($resource, apiCategories) {
    return {
      categories: $resource(apiCategories.categories, null, {
        query: {
          method: 'GET',
          isArray: false
        }
      })
    };
  }

})();
