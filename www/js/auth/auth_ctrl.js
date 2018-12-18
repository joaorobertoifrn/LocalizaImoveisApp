angular.module('starter.controllers')

//----------------------
.controller('LoginCtrl', function($scope,$rootScope,$state,$ionicSideMenuDelegate,$location,$localStorage){

  $ionicSideMenuDelegate.canDragContent(false); // hide sidemenu

  //Redirect regsiter page
  $scope.registerPage=function(){$location.path("app/register");}

  //bind loginform textbox
  $scope.inilogin = {email:'', user_password:''};
  //password pattern
  $scope.pwdpattern=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  //form vaildate
  $scope.userLogin=function(form){if(form.$valid) {$location.path("app/dashbaord"); } }

  $scope.goto = function(){$location.path("app/forgot-password");}

  $scope.dashboardPage = function(){$location.path("app/dashbaord");}

  //alertmsgService.showMessage('Failed to update image.Please try again.');

  //console.log($localStorage.userData)
  //$localStorage.userData = [];
  // console.log($localStorage.userData)

})

//----------------------

.controller('RegisterCtrl', function($scope,$rootScope,$state,$location,$timeout,alertmsgService,userService,$localStorage){

$scope.loginPage=function(){$location.path("app/login");}
$scope.pwdpattern=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

//text pattern
$scope.namePattern=/[a-zA-Z]+/;

//mobile number pattern
$scope.phonenumber=/^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;

//bind register form  values
$scope.iniRegister = {
  customer_name:'', email:'',mobile:'',user_password:'',confirm:'',
};

//form vaildate
$scope.userRegister=function(form){
  if($localStorage.userData!='' && typeof($localStorage.userData)!='undefined'){
    $localStorage.userData = [];
    if(form.$valid){
    userService.register($scope.iniRegister)
    alertmsgService.showMessage('Successful Registered');
    $timeout(function() {$location.path("app/dashbaord");}, 1900);
    //console.log($localStorage.userData)
    //$localStorage.userData = [];
    $rootScope.isLoggedin = true;
    }
  }else{
    if(form.$valid){
    userService.register($scope.iniRegister)
    alertmsgService.showMessage('Successful Registered');
    $timeout(function() {$location.path("app/dashbaord");}, 1900);
    //$localStorage.userData = [];
    $rootScope.isLoggedin = true;
  }}
};

$scope.typeName=[{t_id:'11',name:'Owner'},{t_id:'12',name:'Broker'},{t_id:'13',name:'Builder'}];
//set active class method and variables

  $scope.selectedButton = null;  // initialize our variable to null
  $scope.isshow = false;
  $scope.status=false;
  var temp;
  $scope.activeButton = function(index,val){  //function that sets the value of selectedButton to current index
       //console.log(index,temp,val);
       $scope.selectedButton = index;
       if(val==false)
       {
         $scope.isshowTime =0;
         if(temp!=index){$scope.isshow = false;$scope.isshowTime = 50;}
         var promise=$timeout( function(){ $scope.isshow = true; },  $scope.isshowTime);
         promise.then(function(){
           //console.log($scope.isshow);
         })
     }
     if(val==true){
        $scope.isshowTime =0;
        if(temp==index){
          $scope.isshow = false;
          $scope.selectedButton = null;
        }
       	else{
          $scope.isshow = false;
       		$scope.isshowTime = 50;
       		var promise=$timeout( function(){ $scope.isshow = true;},  $scope.isshowTime);
          promise.then(function(){
            //console.log($scope.isshow);
          })
       		//$scope.isshow = true;
       	}
     }
    temp=index;
  }
})

//----------------------
.controller('ForgotPasswordCtrl', function($scope,$location,$timeout,alertmsgService){

  $scope.loginPage=function(){$location.path("app/login");}

  $scope.submitButton = function(){
    alertmsgService.showMessage('New Password is send to your registered email address.');
    $timeout(function() {$location.path("app/login");}, 1900);
  }


})
//----------------------
.controller('AccountDetailCtrl', function($scope,$rootScope,$localStorage,alertmsgService) {

});
//----------------------
