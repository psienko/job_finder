(function() {
  'use strict';

  angular
    .module('jobFinder')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
