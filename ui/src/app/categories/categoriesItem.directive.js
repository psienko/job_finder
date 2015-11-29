(function () {
    'use strict';

    angular
        .module('jobFinder')
        .directive('categoryItem', categoryItem);

    /** @ngInject */
    function categoryItem() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/categories/categoryItem.html',
            controller: categoryItemController,
            controllerAs: 'vm',
            scope: {},
            bindToController: {
                category: '='
            }
        };

        return directive;

        /** @ngInject */
        function categoryItemController($log, toastr) {
            var vm = this;


        }

    }
})();
