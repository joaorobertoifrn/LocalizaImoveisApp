angular.module('starter.services')

.factory('httpRequest', function($http,$rootScope,$localStorage,$q,progressService,alertmsgService,$timeout) {

  var requestTimeout = 30000;

  return {

    getRequest: function(request,loader) {

		if(typeof(loader)=='undefined' || loader=='Y' ) progressService.showLoader();

		var timeout = $q.defer(), result = $q.defer(), timedOut = false;
		var deferred = $q.defer();

		$timeout(function() { timedOut = true; timeout.resolve(); }, requestTimeout);


		$http({method:'GET',url:APIURL,cache:false,timeout: timeout.promise})
		.success(function(data) {
		  deferred.resolve(data);  $ionicLoading.hide();
		})
		.error(function(data) {
			if (timedOut) {
				progressService.hideLoader();
				alertmsgService.tostMessage('Request Timeout. The request has taken too much time to process.');
			} else {
				deferred.reject(data);
				progressService.hideLoader();
				alertmsgService.tostMessage('Request Timeout. The request has taken too much time to process.');
			}
		});

		return deferred.promise;
    },
	postRequest: function(action,dataString,loader) {
    console.log('in post request in http');
		//if(typeof(loader)=='undefined' || loader=='Y' )progressService.showLoader();
		var timeout = $q.defer(), result = $q.defer(), timedOut = false;
		var deferred = $q.defer();
		$timeout(function() { timedOut = true; timeout.resolve(); }, requestTimeout);
    console.log('from http');
		console.log(dataString);

    $timeout(function() { timedOut = true; timeout.resolve(); }, requestTimeout);

    return deferred.promise;
	}
  };

});

angular.module('starter.services')
.factory('progressService', function($ionicLoading) {
 var service = {
   showLoader: function(text) {
     if (!text) text = '<ion-spinner icon="spiral"></ion-spinner>';
     $ionicLoading.show({template: text});
   },
   hideLoader: function() {
     $ionicLoading.hide();
   }
 };

 return service;
});

angular.module('starter.services')
.factory('alertmsgService', function($ionicPopup,$cordovaToast,$cordovaInAppBrowser) {

 var service = {
        showMessage: function(msg) {
     $ionicPopup.alert({
        title: 'Information', template: msg,
        buttons: [ { text: 'OK',type: 'button-balanced', } ]
     });
        },
        tostMessage: function(msg){
           $cordovaToast
            .showShortTop(msg)
            .then(function(success) {    }, function (error) {      });
        },
    tostBMessage:function(msg){
       $cordovaToast.showLongBottom(msg).then(function(success) {
       // success
       }, function (error) {
       // error
       });
    }

   };

   return service;
});
