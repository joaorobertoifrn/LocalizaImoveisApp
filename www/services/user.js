angular.module('starter.services')
.factory('userService', function(httpRequest,$rootScope,$localStorage) {
  'use strict';

  var service = {
    login: function (data) {
		return httpRequest.request('/customer/login','POST',data);
    },
	register: function (data) {
    $localStorage.userData =  data;
    //return $localStorage.userData;
    },
	getProfile: function (data) {
		//return httpRequest.request('/customer/get-profile','POST',data);
    },
	updateProfile: function (data) {
		//return httpRequest.request('/customer/update','POST',data);
    },
	updatePassword: function (data) {
		//return httpRequest.request('/auth/customer/change-password','POST',data);
  }

  };

  return service;
});
