(function () {
    'use strict';

    angular
        .module('jobFinder')
        .factory('myAdsService', myAdsService);
        
    /** @ngInject */
    function myAdsService($http, $q, apiProposalsConsts, $log) {

        var serviceUrl = apiProposalsConsts.apiProposalsUri;
        var proposalsServiceFactory = {};

        function _getRequest(url) {

            var deferred = $q.defer();
            $http.get(url).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                $log.debug(err.error_description + status);
                deferred.reject(err);
            });
            return deferred.promise;
        }

        var _getAllProposals = function () { return _getRequest(serviceUrl); };

        var _putProposal = function (data) {
            var deferred = $q.defer();
            $http.put(serviceUrl + data.Id, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                $log.debug(err.error_description + status);
                deferred.reject(err);
            });
            return deferred.promise;
        };

        var _postProposal = function (data) {
            var deferred = $q.defer();
            $http.post(serviceUrl, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                $log.debug(err.error_description + status);
                deferred.reject(err);
            });
            return deferred.promise;
        };

        var _userVoteForProposal = function (data) {
            var deferred = $q.defer();
            $http.post(apiProposalsConsts.userVoteForProposalUri, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                $log.debug(err.error_description + status);
                deferred.reject(err);
            });
            return deferred.promise;
        };
        
        var _deleteProposal = function (data) {
            var deferred = $q.defer();
            $http.delete(serviceUrl + data.Id, data).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                $log.debug(err.error_description + status);
                deferred.reject(err);
            });
            return deferred.promise;
        };

        proposalsServiceFactory.getProposals = _getAllProposals;
        proposalsServiceFactory.addProposal = _postProposal;
        proposalsServiceFactory.updateProposal = _putProposal;
        proposalsServiceFactory.deleteProposal = _deleteProposal;
        proposalsServiceFactory.userVoteForProposal = _userVoteForProposal;

        return proposalsServiceFactory;
    }

})();