angular.module('starter.controllers')
.controller('PropertySearchCtrl', function($scope,$rootScope,$state,$ionicSideMenuDelegate,$location){
		'use strict'
$scope.toggleLeftSideMenu = function() { $ionicSideMenuDelegate.toggleLeft();  };
});