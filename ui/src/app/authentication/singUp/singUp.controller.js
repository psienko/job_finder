(function() {
  'use strict';

  angular
    .module('jobFinder')
    .controller('SingUpController', SingUpController);

  /** @ngInject */
  function SingUpController($location, appAuthService, $log, toastr) {
    var vm = this;

    vm.singUpData = {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      lastname: "",
      phoneNumber: ""
    };
    vm.errorMessage = "";

    vm.singUp = singUp;

    function singUp() {
      appAuthService.singUp(vm.singUpData).then(function(response) {
          toastr.success("Rejestracja zakończona powodzeniem. <br/> Możesz się już zalogować.", " ");
          $log.debug(response.data);
        },
        function(err) {
          vm.message = err.errors[0];
          vm.singUpData = {};
          vm.loginForm.$setPristine();
        });
    }

  }
})();
