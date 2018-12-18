angular.module('starter.controllers')
//------------------------
.controller('FeedbackCtrl', function($scope,$rootScope,$state,$ionicSideMenuDelegate,$location){
		'use strict'
$scope.toggleLeftSideMenu = function() { $ionicSideMenuDelegate.toggleLeft();  };
});