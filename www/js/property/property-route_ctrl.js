
angular.module('starter.controllers')

.controller('RouteCtrl', function($scope,$filter,$rootScope,$stateParams,$location,$ionicSideMenuDelegate,$timeout,alertmsgService,$ionicModal,$localStorage,$cordovaGeolocation,progressService){
'use strict';

$scope.propertyLoc = $stateParams.latlong;
console.log($scope.propertyLoc)

//-- spliting of property lattitude and longitude ---
$scope.propertyLocation = [];
$scope.propertyLocation = $scope.propertyLoc.split("-");
console.log($scope.propertyLocation)

//--- Road map section ---
//  console.log($rootScope.userLat);

progressService.showLoader();
$timeout(function() { progressService.hideLoader(); }, 4000);
//========================================================
 //console.log($rootScope.userLat+" : "+$rootScope.user_long);

  var Center = new google.maps.LatLng($rootScope.userLat, $rootScope.userLong);
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;
  //------------------------------
    directionsDisplay = new google.maps.DirectionsRenderer();
    var properties = {
    center: Center,
    zoom: 20,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map2"), properties);
    directionsDisplay.setMap(map);

    var marker = new google.maps.Marker({
    position: Center,
    animation: google.maps.Animation.BOUNCE,
    });

   // marker.setMap(map);
  //------------------------------

    var start = new google.maps.LatLng($rootScope.userLat,$rootScope.userLong);
    var end = new google.maps.LatLng($scope.propertyLocation[0],$scope.propertyLocation[1]);
    // var start = new google.maps.LatLng($rootScope.userLat,$rootScope.userLong);
    // var end = new google.maps.LatLng(23.568,77.2359);
    var request = {
    origin: start,
    destination: end,
    travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    } else {
      progressService.hideLoader();
      alertmsgService.showMessage("couldn't get directions:"+ status);
    }
    });
//------------------------------

});
