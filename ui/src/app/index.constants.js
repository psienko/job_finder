/* global toastr:false, moment:false */
(function () {
  'use strict';

  var serviceBase = 'http://jobfinder-prz.herokuapp.com/api/v1/auth/';

  angular
    .module('jobFinder')
    .constant('moment', moment)
    .constant('toastr', toastr)
    .constant('ngAuthSettings', {
        apiServiceBaseUri: serviceBase,
        apiSignINUri: serviceBase + 'sign_in'
    });

})();
