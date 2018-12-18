angular.module('starter.controllers')
.controller('ShortListCtrl', function($scope,$rootScope,$state,$localStorage,$ionicSideMenuDelegate,$location){
		'use strict'
$scope.toggleLeftSideMenu = function() { $ionicSideMenuDelegate.toggleLeft();  };

//$localStorage.favouriteProperty = [];
if($localStorage.favouriteProperty!='' && typeof($localStorage.favouriteProperty)!='undefined'){
	$scope.favListing = $localStorage.favouriteProperty;
	console.log("1st" ,$localStorage.favouriteProperty );
}else{
	$localStorage.favouriteProperty = $scope.favListing;
	console.log("2nd",$localStorage.favouriteProperty );
}

$scope.propertyDetailPage = function(id){
	console.log(id);
	$location.path("app/property-detail/"+id);
}
});
