'use strict';
angular.module('starter.controllers')

.controller('PropertyCtrl', function($scope,$filter,$rootScope,$ionicModal,$state,$ionicSideMenuDelegate,$localStorage,$location,$compile,progressService,propertyService,$ionicScrollDelegate,$cordovaGeolocation,$timeout){
	'use strict'
	$scope.toggleLeftSideMenu = function() { $ionicSideMenuDelegate.toggleLeft();  };
	$scope.isheart=false;
	$scope.filter=false;
	$scope.sort=false;

  $rootScope.user_lat=28.7041;
  $rootScope.user_lng=77.1025;

	//$localStorage.favouriteProperty=[];
	//--------Get PropertyList------------------------
    propertyService.getPropertylist()
      .then(function(response) {
        $rootScope.propertylist = response.data.propertylist;
				if(typeof($localStorage.favouriteProperty)!='undefined' && $localStorage.favouriteProperty!='' ){
					angular.forEach($rootScope.propertylist, function(value, key) {
						var filteredObj = $localStorage.favouriteProperty.find(function(obj, i){
							//console.log(obj)
							 if(obj.porp_id == value.porp_id){
										console.log("test")
										$rootScope.propertylist[key].favouriteStatus=true;
							 }
						});
					});
					console.log("1st" , $localStorage.favouriteProperty)
				}else{
					console.log("2st")
					$localStorage.favouriteProperty=[];
				}

      }, function(error) {
    //$rootScope.tostMsg(error);
    });

		$scope.filterList = [];
		//console.log($scope.filterList)
    $scope.getPropertylist=function(){
			$scope.filterList = [];
			angular.forEach($rootScope.propertylist, function(value1, key1) {
				angular.forEach($scope.filterContainerArray, function(value2, key2) {
					console.log(value1.bed_rooms,value2)
						if(value1.bed_rooms==value2){
							$scope.filterList.push(value1)
						}
						if(value1.postedby==value2){
							$scope.filterList.push(value1)
						}
						if(value1.furnish_status==value2){
							$scope.filterList.push(value1)
						}
				});
			});
			progressService.showLoader();
			$timeout(function() { progressService.hideLoader(); }, 600);
		//	console.log($scope.filterList)
			$rootScope.propertylist=$scope.filterList;

    };

		$scope.resetFilter = function(){
			propertyService.getPropertylist()
	      .then(function(response) {
	        $rootScope.propertylist = response.data.propertylist;
	        //console.log($rootScope.propertylist);
	      }, function(error) {
	    //$rootScope.tostMsg(error);
	    });
		}

  //-----suheader title section ----
  $scope.subheaderData=[{title:'FILTER',icon:'ion-funnel',status:false},{title:'SORT BY',icon:'ion-levels',status:false}]

  $scope.sortingOption = function(id){
    if(id==0){
      if(!$scope.subheaderData[id].status){angular.forEach($scope.subheaderData, function(value, key) {	$scope.subheaderData[key].status = false;	});}
      $scope.subheaderData[id].status=true;
      $scope.filterShow();
    }else{
      if(!$scope.subheaderData[id].status){angular.forEach($scope.subheaderData, function(value, key) {	$scope.subheaderData[key].status = false;	});}
      $scope.subheaderData[id].status=true;
      $scope.sortShow();
    }
  }
//----search filter modal and map view modal---
  $scope.showModalSection = function(id) {
    if(id==1){
      $ionicModal.fromTemplateUrl('js/property/property-search-modal.html', {
        scope: $scope,animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.settingmodal1 = modal;
        $scope.settingmodal1.show();
      });
    }
  };

	$ionicModal.fromTemplateUrl('js/property/property-map-modal.html', {
		scope: $scope,animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.settingmodal2 = modal;
	});

  $scope.closeModal = function(id) {
    if(id==1){$scope.settingmodal1.hide();}
    else if(id==2){$scope.settingmodal2.hide();}
  };
//----------------------MAP view---------------------------
	$scope.mapviewshow = function(){
		$scope.settingmodal2.show();
		progressService.showLoader();
		//-----------Creat Map----------------------

		var center_location = [{lat:$rootScope.user_lat,long:$rootScope.user_lng}];

		var mapOptions = {
		        zoom:9,
		        center: new google.maps.LatLng(center_location[0].lat, center_location[0].long),
		        mapTypeControlOptions: {
		          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
		          signed_in:false,
		          mapTypeIds:[google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.SATELLITE]
		        }
		      }
		//Display map
		$scope.map = new google.maps.Map(document.getElementById('map1'), mapOptions);

		//Set Map style
		$scope.markers = [];

		// $scope.number = [];
		// for (var z = 1; z <= $rootScope.propertylist.length; z++){$scope.number.push(z);}
		//
		// console.log($scope.number)
		//
		// for(var x = 0; x < $scope.number.length; x++){
		// 	console.log($scope.number[x])
		// 	var image = {url: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld='+$scope.number[x]+'|FF776B|000000',};
		// }



		var infoWindow = new google.maps.InfoWindow();

		//Below function call to set loctions
		var createMarker = function (info){
			var image = {url: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld='+info.counter+'|dc393a|000000',};
		  //console.log(info)
		  var marker = new MarkerWithLabel({
		    position: new google.maps.LatLng(info.latitude, info.longitude),
		    title: info.list_title,
		    map: $scope.map,
		    animation: google.maps.Animation.DROP,
		    icon:image,
		    labelContent: info.list_snum,
		    labelAnchor: new google.maps.Point(10,32),
		    labelClass: "labels",
		    labelInBackground: true,

		  });
		     var starC = 'rating';
		     var starN = '';
		    var contentStr ='<a ng-click="showMapItemDetail('+info.porp_id+');" class="infoWindowContent">'+
		        '<h5>' + info.name + '</h5>' +
		        '<div>' + info.area_name + '</div>' +
		        '</a>';

		   var compleStr = $compile(contentStr)($scope);
		    marker.content  = compleStr[0];
		  //The below code call when click at the location
		  google.maps.event.addListener(marker, 'click', function(){
		    infoWindow.setContent(marker.content);
		    infoWindow.open($scope.map, marker);
		  });
		  $scope.markers.push(marker);
		}
		//set locations
		for (var i = 0; i < $rootScope.propertylist.length; i++){
			$rootScope.propertylist[i].counter = i+1;
			createMarker($rootScope.propertylist[i]);

		  }

		$timeout(function() { progressService.hideLoader(); }, 2000);
		//---------------------------------
	}

//----Filter modal section---

//--Range Slider for amount --
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
//--Range Slider for area --
$scope.sliderarea = {
  min: 1000,
  max: 3800,
  options: {
    floor: 0,
    ceil: 5000,
    translate: function(value) {
      return 'Sq.ft ' + value;
    }
  }
};

$scope.$on("slideEnded", function() {
     //slider amount
     $scope.minAmt=$scope.slider.min;
     $scope.maxAmt=$scope.slider.max;
});
//---------------------------
$scope.updateTextInput=function(val) {
document.getElementById('textInput').value=val;
}


$scope.selected =null;


$scope.openPage=function() { $scope.filter=true; $scope.sort=false; $location.path('app/propertyfilter'); $scope.filter=false; }

//for sorting filter
$scope.showPropertylist=function(data){
	if(data=="highprice"){console.log("according to value:"+data);
	$rootScope.propertylist = $filter('orderBy')($rootScope.propertylist,'price',true);
}
if(data=="lowprice"){
	//console.log("according to value:"+data);
	$ionicScrollDelegate.scrollTop();
	$rootScope.propertylist = $filter('orderBy')($rootScope.propertylist,'price',false);
}
if(data=="area_range1"){
	//console.log("according to value:"+data);
	$rootScope.propertylist = $filter('orderBy')($rootScope.propertylist,'area_range',true);
}
if(data=="area_range2"){
	//console.log("according to value:"+data);
	$rootScope.propertylist = $filter('orderBy')($rootScope.propertylist,'area_range',false);
}
if(data=="Default") {
	//console.log("according to value:"+data);

	$rootScope.propertylist = $filter('orderBy')($rootScope.propertylist,'porp_id',false);
}

} //------Sort Options-----


$ionicModal.fromTemplateUrl('js/property/propertysorting.html', { scope: $scope })
.then(function(modal) { $scope.sortModal = modal; });
$scope.sortClose = function() { $scope.sortModal.hide(); };
$scope.sortShow = function() {
	$scope.sort=true;
	$scope.filter=false;
	$scope.sortOptions = [
	{name:"Default",val:"Default"},
	{name:"Most Recent",val:"most_recent"},
	{name:"Square Foot Low to high",val:"area_range1"},
	{name:"Square Foot High to Low",val:"area_range2"},
	{name:"Price- Low to High",val:"lowprice"},
	{name:"Price- High to Low",val:"highprice"}
	];
	$scope.sortModal.show();
};

$scope.setProductSort = function(data){
	$rootScope.sortProductBy = data;
	$scope.sortModal.hide();
	$scope.sort=false;
	$scope.showPropertylist(data);

}
//end of sorting filter


//-------------property filter modal-------
$ionicModal.fromTemplateUrl('js/property/propertyfilter.html', { scope: $scope })
.then(function(modal) { $scope.filterModal = modal; });
$scope.filterClose = function() { $scope.filterModal.hide(); };
$scope.filterShow = function() {
	propertyService.getPropertylist()
		.then(function(response) {
			$rootScope.propertylist = response.data.propertylist;
			//console.log($rootScope.propertylist);
		}, function(error) {
	//$rootScope.tostMsg(error);
	});
	$scope.propertytype = [
	{name:"Flat",val:"Flat",status:false},{name:"House/Villa",val:"House/Villa",status:false},{name:"Office Space",val:"Office Space",status:false},
	{name:"PG/Hostel",val:"PG/Hostel",status:false},{name:"Other Commercial",val:"Other Commercial",status:false},{name:"Shoop/Showroom",val:"Shoop/Showroom",status:false}
	];

	$scope.furnishingstatus = [
	{name:"Furnished",val:"Furnished",status:false},{name:"Semi-Finished",val:"Semi-Finished",status:false},{name:"Un-finished",val:"Un-finished",status:false}
	];

	$scope.posttype = [{name:"Owner",val:"Owner",status:false},{name:"Builder",val:"Builder",status:false},{name:"Agent",val:"Agent",status:false}	];

	$scope.brooms = [
	{name:"1",val:"One",status:false},{name:"2",val:"Two",status:false},{name:"3",val:"Three",status:false},{name:"4",val:"Four",status:false},
  {name:">4",val:"morethan4",status:false}
];

  //-----selection of property type---
  $scope.selectProperty = function(id){ $scope.propertytype[id].status=!$scope.propertytype[id].status;  }
  //---selection of room---
  $scope.filterContainerArray=[];
  //console.log($scope.filterContainerArray);
  $scope.selectroom = function(id){
    $scope.brooms[id].status=!$scope.brooms[id].status;
    $scope.orderbyString = $scope.brooms[id].val;
		//console.log($scope.orderbyString)
    //----entering value and removing value from the array -----
    if($scope.brooms[id].status){
      if(!~$scope.filterContainerArray.indexOf($scope.orderbyString)){ $scope.filterContainerArray.push($scope.orderbyString);
				//console.log($scope.filterContainerArray)
			}
    }else{ $scope.filterContainerArray.splice(id, 1);
			//console.log($scope.filterContainerArray)
		}
    //---------------------
		//console.log($scope.filterContainerArray);
  }
  //----selection of posted by --
  $scope.selectposted =function(id){
		$scope.posttype[id].status=!$scope.posttype[id].status;
		$scope.postedBy = $scope.posttype[id].val;
		//----entering value and removing value from the array -----
    if($scope.posttype[id].status){
      if(!~$scope.filterContainerArray.indexOf($scope.postedBy)){ $scope.filterContainerArray.push($scope.postedBy); }
    }else{ $scope.filterContainerArray.splice(id, 1); }
		//console.log($scope.filterContainerArray);
	}

  //----selection of furnishing status --
  $scope.furStatus = function(id){
		$scope.furnishingstatus[id].status=!$scope.furnishingstatus[id].status;
		$scope.furstst = $scope.furnishingstatus[id].val;
		//console.log($scope.furstst)
		//----entering value and removing value from the array -----
    if($scope.furnishingstatus[id].status){
      if(!~$scope.filterContainerArray.indexOf($scope.furstst)){ $scope.filterContainerArray.push($scope.furstst);
				//console.log($scope.filterContainerArray)
			}
    }else{ $scope.filterContainerArray.splice(id, 1);
			//console.log($scope.filterContainerArray)
		}
		//console.log($scope.filterContainerArray);

	}

	$scope.filterModal.show();
};

//end of property modal


	//---favourite property selection --
	$scope.selectFavourite = function(index,favId){
		//console.log(index)
	  $rootScope.propertylist[index].favouriteStatus=!$rootScope.propertylist[index].favouriteStatus;

			//--------Get Favourite List------------------------
			$scope.favourite = $rootScope.propertylist[$rootScope.propertylist.getIndexBy("porp_id", favId)];
			//console.log($scope.favourite.porp_id)

			//----entering value and removing value from the local storage -----
	    if($rootScope.propertylist[index].favouriteStatus){
				if(typeof($localStorage.favouriteProperty)=='undefined' && $localStorage.favouriteProperty==''){
					$localStorage.favouriteProperty = [];
				}else{
					if(!~$localStorage.favouriteProperty.indexOf($scope.favourite)){
						 $localStorage.favouriteProperty.push($scope.favourite);
						 //console.log($localStorage.favouriteProperty)
					 }
				}
	    }else{
				$localStorage.favouriteProperty.splice(index, 1);
			//	console.log($localStorage.favouriteProperty)
		 }
	}

//--- property detail page routing --
$scope.propertyDetailPage = function(id){
	//console.log(id);
	$location.path("app/property-detail/"+id);
}

$scope.doRefresh = function() {
    propertyService.getPropertylist()
		.then(function(response) {
			$rootScope.propertylist = response.data.propertylist;
			if(typeof($localStorage.favouriteProperty)!='undefined' && $localStorage.favouriteProperty!='' ){
				angular.forEach($rootScope.propertylist, function(value, key) {
					var filteredObj = $localStorage.favouriteProperty.find(function(obj, i){
						//console.log(obj)
						 if(obj.porp_id == value.porp_id){
									console.log("test")
									$rootScope.propertylist[key].favouriteStatus=true;
						 }
					});
				});
				console.log("1st" , $localStorage.favouriteProperty)
			}else{
				console.log("2st")
				$localStorage.favouriteProperty=[];
			}
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
}
})
//--------------------------------------------------------------------------------


.controller('PropertyDetailCtrl', function($scope,$filter,$rootScope,$state,$stateParams,$cordovaEmailComposer,alertmsgService,$ionicSideMenuDelegate,$location,propertyService,progressService,$timeout,$cordovaSocialSharing){
	'use strict'
	$scope.toggleLeftSideMenu = function() { $ionicSideMenuDelegate.toggleLeft();  };
	$scope.productParticular = $stateParams.prId;

	//--------Get PropertyList------------------------
    propertyService.getPropertylist()
      .then(function(response) {
        $rootScope.detpropertylist = response.data.propertylist;
				$scope.specificProducts = $rootScope.detpropertylist[$rootScope.detpropertylist.getIndexBy("porp_id", $scope.productParticular)];
        //console.log($scope.specificProducts);

      }, function(error) {
    //$rootScope.tostMsg(error);
    });

			$scope.sendEmail = function(){
				$cordovaEmailComposer.isAvailable().then(function() {
						alert("available");
						}, function () {
							alert("not available");
					});

		  var email = {
		     to: 'teste@example.com',
		     cc: 'teste@example.com',
		     bcc: ['john@doe.com', 'jane@doe.com'],
		     attachments: null,
		     subject: 'Mail subject',
		     body: 'Dummy email for the enquiry purpose',
		     isHtml: true
		  };

		 $cordovaEmailComposer.open(email).then(null, function () {
		   // user cancelled email
		  });
	 }

	 //--- Road map routing ---
	 $scope.roadMap = function(latitude,longitude){
		 $location.path("app/property-route-detail/"+latitude+'-'+longitude);
	 }

	 //--- social sharing --
	 $scope.twitterShare=function(){
    window.plugins.socialsharing.shareViaTwitter
		('Digital Signature Maker', null /* img */, 'https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker',null,
		function(errormsg)
		{
			//alert("Error: Cannot Share")
		}
	);
  }
});
