(function() {
  'use strict';

  angular
    .module('jobFinder')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, toastr) {
    // Enable log
    $logProvider.debugEnabled(true);

    $httpProvider.interceptors.push('authInterceptorService');

    // Set options third-party lib
    toastr.options.closeButton = false;
    toastr.options.debug = false;
    toastr.options.newestOnTop = true;
    toastr.options.progressBar = false;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.onclick = null;
    toastr.options.showDuration = 300;
    toastr.options.hideDuration = 1000;
    toastr.options.timeOut = 5000;
    toastr.options.extendedTimeOut = 1000;
    toastr.options.showEasing = "swing";
    toastr.options.hideEasing = "linear";
    toastr.options.showMethod = "fadeIn";
    toastr.options.hideMethod = "fadeOut";
    
  }

})();
