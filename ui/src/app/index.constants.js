/* global toastr:false, moment:false */
(function () {
  'use strict';

  var serviceBase = 'http://localhost:11550/';

  angular
    .module('jobFinder')
    .constant('moment', moment)
    .constant('toastr', toastr)
    .constant('ngAuthSettings', {
      apiServiceBaseUri: serviceBase,
      clientId: 'ngAuthApp'
    });

})();
