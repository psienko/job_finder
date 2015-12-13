/* global toastr:false, moment:false */
(function() {
  'use strict';

  var serviceBase = 'http://jobfinder-prz.herokuapp.com/api/v1/';

  angular
    .module('jobFinder')
    .constant('moment', moment)
    .constant('toastr', toastr)
    .constant('ngAuthSettings', {
      apiServiceBaseUri: serviceBase,
      apiSignUPUri: serviceBase + 'auth',
      apiSignINUri: serviceBase + 'auth/sign_in',
      apiSignOUTUri: serviceBase + 'auth/sign_out'
    })
    .constant('apiCategories', {
      categories: serviceBase + 'categories'
    })
    .constant('apiAdvertisments', {
      advertisments: serviceBase + "categories/:id/advertisements/:advertId"
    });

})();
