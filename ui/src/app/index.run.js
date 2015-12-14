(function() {
  'use strict';

  angular
    .module('jobFinder')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, appAuthService) {
    appAuthService.fillAuthData();
    $log.debug('runBlock end');
  }

})();
