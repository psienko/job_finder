(function () {
    'use strict';

    angular
        .module('jobFinder')
        .controller('loginController', loginController);

    /** @ngInject */
    function loginController($scope, $location, appAuthService, ngAuthSettings, $log, toastr) {

        $scope.loginData = {
            userName: "",
            password: ""
        };

        $scope.message = "";

        $scope.$on = function () {
            toastr.info("Wpisz Login i hasło żeby się zalogować.", " ");
        };

        $scope.login = function () {
            appAuthService.login($scope.loginData).then(function (response) {
                $log.debug(response);
                $location.path('/');
            },
                function (err) {
                    $scope.message = err.error_description;
                    $scope.loginData.password = "";
                    $scope.loginForm.$setPristine();
                });
        };

    }
})();
