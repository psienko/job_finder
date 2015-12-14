(function() {
  'use strict';

  angular
    .module('jobFinder')
    .directive('myAdvertsItem', myAdvertsItem);

  /** @ngInject */
  function myAdvertsItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/myAdverts/myAdvertsItem.html',
      controller: myAdvertsItemController,
      controllerAs: 'vm',
      scope: {},
      bindToController: {
        myAdvert: "=",
        category: "="
      }
    };

    return directive;

    /** @ngInject */
    function myAdvertsItemController(advertsService, $log, toastr) {
      var vm = this;

      vm.editAvert = editAvert;
      vm.cancelEditAdvert = cancelEditAdvert;

      vm.editedAvert = angular.copy(vm.myAdvert, vm.editedAvert);

      function editAvert(myAdvert) {
        var advertisement = {
          title: myAdvert.title,
          content: myAdvert.content,
          profession: myAdvert.profession,
          active: myAdvert.active,
          contactEmail: myAdvert.contactEmail,
          contactPhone: myAdvert.contactPhone,
          contactPerson: myAdvert.contactPerson,
          typeOfEmployment: myAdvert.typeOfEmployment,
          expiresAt: myAdvert.expiresAt
        };

        advertsService.advertisments.update({
          id: vm.category.id,
          advertId: myAdvert.id
        }, advertisement).$promise.then(
          function (results) {
            toastr.success('Ogłoszenie zostało zaktualizowane');
            angular.copy(vm.myAdvert, vm.editedAvert);
            $log.debug(results);
          },
          function (err) {
            $log.debug(err.data.Message + '\nStatus:' + err.status);
            vm.errorMessage = err.data.Message;
          });
      }

      function cancelEditAdvert() {
        angular.copy(vm.editedAvert, vm.myAdvert);
      }

    }
  }
})();
