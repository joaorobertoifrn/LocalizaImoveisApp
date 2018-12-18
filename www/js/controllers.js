angular.module('starter.controllers',[])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope,$localStorage,$filter,propertyService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  //$scope.accountDisplayData = $localStorage.userData;
  $rootScope.isLoggedin = false;

  if($localStorage.userData!='' && typeof($localStorage.userData)!='undefined'){
		$scope.accountDisplayData = $localStorage.userData;
    $rootScope.isLoggedin = true;
	}




  //console.log("test", $scope.accountDisplayData)
  $scope.loginData = {};


  // console.log($localStorage.userData)
  // console.log($localStorage.userData.length)
  // console.log($rootScope.isLoggedin)

  // if(typeof($localStorage.userData.length)=='undefined' || $localStorage.userData.length=='')
  //   $rootScope.isLoggedin = true;
  // else  $rootScope.isLoggedin = false;
  // console.log($rootScope.isLoggedin)

  propertyService.getPropertylist()
    .then(function(response) {
      $rootScope.searchDefaultCats = response.data.propertylist;
    }, function(error) {
      //$rootScope.tostMsg(error);
    });

  //---Search section for the property---
  $scope.popularSearch = [
      {id:7,img:'img/img1.jpg',price:'49',loc:'Mayur vihar',addr:'At Sector 16 C, Greater Noida W.UP'},
      {id:8,img:'img/img4.jpg',price:'68',loc:'Patparganj',addr:'In Uttam Nagar, New Delhi'},
      {id:14,img:'img/img2.jpg',price:'17',loc:'Tagore Garden',addr:'radhu palace near v3s mall laxmi nagar delhi., Laxmi Nagar, Laxmi Nagar, New Delhi'},
      {id:1,img:'img/img10.jpg',price:'20',loc:'Rajouri Garden',addr:'In Uttam Nagar, New Delhi'},
      {id:9,img:'img/img9.jpg',price:'30',loc:'Kalka Ji',addr:'Electronics City Phase 1, Bangalore'}
  ];

  $scope.getSearchResult = function(keywords){
		$scope.searchCats = $filter('filter')($rootScope.searchDefaultCats,{area_name:keywords});
		if($scope.searchCats=='') $scope.searchCats = '';
	}
	$scope.resetSearch = function(keywords){ $scope.searchCats = '';	}
	//$scope.searchProduct = function(cat_id,title){ $location.path("app/search/"+cat_id+"/"+title.replace("&amp;","and"));	}

  //$scope.accountDisplayData = $localStorage.userData;

  $scope.logout =function(){
    if($localStorage.userData!='' && typeof($localStorage.userData)!='undefined'){
      $localStorage.userData =[];
      console.log($localStorage.userData)
  	}
  }
});
