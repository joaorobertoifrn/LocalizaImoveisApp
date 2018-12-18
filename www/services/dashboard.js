angular.module('starter.services',[])
.factory('dashboardService', function($http,$rootScope) {
  'use strict';

  var service = {
    getlocationlist: function () {		 
		 return $http.get("data/dashboard/property.json");
		 
    }

};
  return service;
});