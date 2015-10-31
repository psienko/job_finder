(function () {
    'use strict';

    angular
        .module('jobFinder')
        .controller('valuesController', valuesController);

    /** @ngInject */
    function valuesController($scope, valuesService, $log) {
        /* jshint validthis:true */
        $scope.values = [];

        valuesService.getValues().then(function (results) {
            $scope.values = results;
        },
            function (error) {
                $log.error(error);
            });
    }
})();
