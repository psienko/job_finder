(function () {
    'use strict';

    angular
        .module('jobFinder')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope, $location, appAuthService, ngAuthSettings, $log, toastr) {
        var vm = this;

        vm.loginData = {
            email: "",
            password: ""
        };

        vm.message = "";

        vm.$on = function () {
            toastr.info("Wpisz Login i hasło żeby się zalogować.", " ");
        };

        vm.login = function () {
            appAuthService.login(vm.loginData).then(function (response) {
                $log.debug(response.data);
                $location.path('/');
            },
                function (err) {
                    vm.message = err.errors[0];
                    vm.loginData.password = "";
                    vm.loginForm.$setPristine();
                });
        };

    }
})();
