(function() {
  'use strict';

  angular
    .module('jobFinder')
    .directive('addNewAdvert', addNewAdvert);

  /** @ngInject */
  function addNewAdvert() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/myAdverts/addNewAdvert.html',
      controller: AddNewAdvertController,
      controllerAs: 'vm',
      scope: {},
      bindToController: {
        adverts: "=",
        categories: "="
      }
    };

    return directive;

    /** @ngInject */
    function AddNewAdvertController(advertsService, $log, toastr) {
      var vm = this;

      vm.selectedCategory = {};
      vm.newAdvert = {};
      vm.inAdding = false;
      vm.saveNewAdvert = saveNewAdvert;
      vm.showAdvertForm = showAdvertForm;

      function showAdvertForm(show) {
        vm.newAdvert = {};
        vm.inAdding = show;
      }

      function saveNewAdvert(newAdvert) {
        var advertisement = {
          title: newAdvert.title,
          content: newAdvert.content,
          profession: newAdvert.profession,
          active: true,
          contactEmail: newAdvert.contactEmail,
          contactPhone: newAdvert.contactPhone,
          contactPerson: newAdvert.contactPerson,
          typeOfEmployment: newAdvert.typeOfEmployment,
          expiresAt: newAdvert.expiresAt
        };

        advertsService.advertisments.save({
          id: vm.selectedCategory
        }, advertisement).$promise.then(
          function (results) {
            toastr.success('Ogłoszenie zostało dodane');
            vm.adverts.unshift(results.advertisement);
            showAdvertForm(false);
            $log.debug(results);
          },
          function (err) {
            $log.debug(err.data.Message + '\nStatus:' + err.status);
            vm.errorMessage = err.data.Message;
          });
      }

    }
  }
})();
