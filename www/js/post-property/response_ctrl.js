angular.module('starter.controllers')
.controller('ResponseCtrl', function($scope,$rootScope,$state,$ionicSideMenuDelegate,$location){
		'use strict'
$scope.toggleLeftSideMenu = function() { $ionicSideMenuDelegate.toggleLeft();  };
});