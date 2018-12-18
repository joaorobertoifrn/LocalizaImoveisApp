angular.module('starter.controllers')
.controller('AccountCtrl', function($scope,$rootScope,$state,$ionicSideMenuDelegate,$localStorage,$timeout,$location,alertmsgService,ionicMaterialInk,ionicMaterialMotion){
		'use strict'
$scope.toggleLeftSideMenu = function() { $ionicSideMenuDelegate.toggleLeft();  };

// Set Motion
 $timeout(function() {
		 ionicMaterialMotion.slideUp({
				 selector: '.slide-up'
		 });
 }, 300);

 $timeout(function() {
		 ionicMaterialMotion.fadeSlideInRight({
				 startVelocity: 3000
		 });
 }, 700);


ionicMaterialInk.displayEffect();

$scope.accountData=$localStorage.userData;

//console.log($scope.accountData)
	$scope.userData={customer_name:'',phone:''}
	//Profile update section
	$scope.updateProfile=function(form){
		if(form.$valid){
		$localStorage.userData.customer_name=form.customer_name.$viewValue;
		$localStorage.userData.mobile=form.phone.$viewValue;
	  alertmsgService.showMessage('Successful Updated');
	  $timeout(function() {$location.path("app/dashbaord");}, 1900);
	  }
	}
});
