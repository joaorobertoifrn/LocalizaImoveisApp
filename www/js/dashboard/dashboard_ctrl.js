
angular.module('starter.controllers')

.filter("locationFilter", function() { // register new filter

  return function(propertylist) { // filter arguments


  var rval = [];
  var finalvalue=[];
	 angular.forEach(propertylist,function(obj){
        //console.log(obj);
        rval.push({id:obj.porp_id ,lat:obj.latitude,long:obj.longitude,location:obj.area_name,address:obj.address,name:obj.name});
	 });
	return rval;
  };
})

.controller('DashboardCtrl', function($scope,$filter,$rootScope,$location,$ionicSideMenuDelegate,$timeout,$ionicModal,$localStorage,$cordovaGeolocation,progressService){
'use strict';

$scope.toggleLeftSideMenu = function() { $ionicSideMenuDelegate.toggleLeft();  };

//--Range Slider
$scope.slider = {
  min: 1000,
  max: 3800,
  options: {
    floor: 0,
    ceil: 5000,
    translate: function(value) {
      return '$' + value;
    }
  }
};

$scope.$on("slideEnded", function() {
     //slider amount
     $scope.minAmt=$scope.slider.min;
     $scope.maxAmt=$scope.slider.max;
});

$scope.propertyTypeData = [
  {title:'BUY',status:false},
  {title:'RENT',status:false},
  {title:'PROJECTS',status:false},
  {title:'DEALER',status:false}
];

$scope.propertySubmitData = [
  {title:'RESIDENTIAL',status:false},
  {title:'HOUSE/VILLA',status:false},
  {title:'PG/HOSTEL',status:false}
];

$scope.propertyTypeSelection=function(index){
  //----first we will unselect and the select the col
  if(!$scope.propertyTypeData[index].status){
    angular.forEach($scope.propertyTypeData, function(value, key) {	$scope.propertyTypeData[key].status = false;	});
  }
  $scope.propertyTypeData[index].status=!$scope.propertyTypeData[index].status;
}

$scope.propertySel=function(index){
  //----first we will unselect and the select the col
  if(!$scope.propertySubmitData[index].status){
    angular.forEach($scope.propertySubmitData, function(value, key) {	$scope.propertySubmitData[key].status = false;	});
  }
  $scope.propertySubmitData[index].status=!$scope.propertySubmitData[index].status;
}

//console.log($scope.userAddress )

//----Location Detect for the user---
var posOptions = {timeout: 10000, enableHighAccuracy: false};
$cordovaGeolocation
.getCurrentPosition(posOptions)
.then(function (position) {
  var lat  = position.coords.latitude
  var lng = position.coords.longitude
  $rootScope.userLat = position.coords.latitude;
  $rootScope.userLong = position.coords.longitude;
  $scope.getAddress({lat:lat,lng:lng});
}, function(err) {
  // error
});

$scope.getAddress = function(attrs){
    progressService.showLoader();
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(attrs.lat, attrs.lng);
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          $rootScope.userAddress = results[1].formatted_address;
          progressService.hideLoader();
          //$timeout(function(){ $location.path("app/dashboard");  }, 1500);
        } else {
          $rootScope.userAddress = 'Location not found';
        }
      } else {
        $rootScope.userAddress = 'Geocoder failed due to: ' + status;
      }
    });
}

  $scope.setLocation = function(data){
  $scope.userLocation = data;

  var lng  = data.geometry.location.lng();
  var lat  = data.geometry.location.lat();
  $rootScope.userAddress  = $scope.userLocation.formatted_address;
  }
//-----------
$scope.propertyListingPage=function(){
  $location.path("app/propertyListing");
}
//------------

 //------------Notification Show--------------------------------
	$ionicModal.fromTemplateUrl('modal-notification.html', { scope: $scope,animation:'' })
	  .then(function(modal) { $scope.notificationModal = modal; });
	  $scope.mapviewClose = function() { $scope.notificationModal.hide(); };

    $scope.notificationShow = function() {
    		  $scope.notificationModal.show();
        }

});
