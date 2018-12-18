angular.module('starter.controllers')
.controller('RequirementCtrl', function($scope,$rootScope,$state,$ionicSideMenuDelegate,$location){
		'use strict'
$scope.toggleLeftSideMenu = function() { $ionicSideMenuDelegate.toggleLeft();  };
});